import { connectToDatabase } from '@utils/database';
import Event from '@models/event';

export const POST = async (request) => {
    const { eventShortDesc, eventFullDesc, eventImgSrc, eventDate } = await request.json();

    try {
        await connectToDatabase();

        const newEvent = new Event({
            eventShortDesc,
            eventFullDesc,
            eventImgSrc,
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
