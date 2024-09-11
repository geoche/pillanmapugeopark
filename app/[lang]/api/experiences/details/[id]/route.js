import { connectToDatabase } from '@utils/database';
import { ObjectId } from 'mongodb';
import Experiences from "@models/experiences";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return new Response("Invalid Experiences ID", { status: 400 });
        }

        const experiencesEntry = await Experiences.findOne({ _id: new ObjectId(id) });

        if (!experiencesEntry) {
            return new Response("Experiences not found", { status: 404 });
        }

        return new Response(JSON.stringify(experiencesEntry), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch experiences details:', error);
        return new Response("Failed to fetch experiences details", { status: 500 });
    }
};
