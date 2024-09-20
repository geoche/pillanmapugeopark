import { connectToDatabase } from '@utils/database';
import Event from '@models/event';
import {del, put} from '@vercel/blob';

export const POST = async (request) => {
    const { eventShortDesc, eventFullDesc, eventImgSrc, eventDate } = await request.json();

    try {
        const imageBuffer = Buffer.from(eventImgSrc.split(",")[1], "base64");

        const { url } = await put(`events/${Date.now()}.png`, imageBuffer, { access: 'public' });
        
        await connectToDatabase();

        const newEvent = new Event({
            eventShortDesc,
            eventFullDesc,
            eventImgSrc: url,
            eventDate
        });

        await newEvent.save();

        return new Response(JSON.stringify(newEvent), { status: 201 });
    } catch (error) {
        return new Response("Failed to add a new event to events table", { status: 500 });
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const event = await Event.find({});

        return new Response(JSON.stringify(event), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch events from database", { status: 500 });
    }
};

// PATCH method to update event details
export const PATCH = async (request) => {
    const { id, eventShortDesc, eventFullDesc, eventDate } = await request.json();

    try {
        await connectToDatabase();

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { eventShortDesc, eventFullDesc, eventDate },
            { new: true }
        );

        if (!updatedEvent) {
            return new Response("Event not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedEvent), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to update event", { status: 500 });
    }
};

// DELETE method to delete event from database and Vercel Blob storage
export const DELETE = async (request) => {
    const { id } = await request.json();

    try {
        await connectToDatabase();

        const eventToDelete = await Event.findById(id);

        if (!eventToDelete) {
            return new Response("Event not found", { status: 404 });
        }

        await del(eventToDelete.eventImgSrc);
        await Event.findByIdAndDelete(id);


        return new Response("Event deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to delete event", { status: 500 });
    }
};
