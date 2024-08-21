import { connectToDatabase } from '@utils/database';
import GuidesAndTours from "@models/guidesAndTours";

export const POST = async (request) => {
    try {
        await connectToDatabase();

        const {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            type,
            contact,
            location,
        } = await request.json();

        const newGuidesAndTours = new GuidesAndTours({
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            type,
            contact,
            location,
        });

        await newGuidesAndTours.save();

        return new Response(JSON.stringify(newGuidesAndTours), { status: 201 });
    } catch (error) {
        return new Response("Failed to create new GuidesAndTours", { status: 500 });
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const guidesAndTours = await GuidesAndTours.find({});

        return new Response(JSON.stringify(guidesAndTours), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch GuidesAndTours", { status: 500 });
    }
};

export const PUT = async (request) => {
    try {
        await connectToDatabase();

        const { id } = request.params;
        const updateData = await request.json();

        const updatedGuidesAndTours = await GuidesAndTours.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedGuidesAndTours) {
            return new Response("GuidesAndTours not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedGuidesAndTours), { status: 200 });
    } catch (error) {
        return new Response("Failed to update the GuidesAndTours", { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const { id } = request.params;

        const deletedGuidesAndTours = await GuidesAndTours.findByIdAndDelete(id);

        if (!deletedGuidesAndTours) {
            return new Response("GuidesAndTours not found", { status: 404 });
        }

        return new Response("GuidesAndTours deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete the GuidesAndTours", { status: 500 });
    }
};
