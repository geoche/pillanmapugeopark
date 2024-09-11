import { connectToDatabase } from '@utils/database';
import { ObjectId } from 'mongodb';
import GuidesAndTours from "@models/guidesAndTours";

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return new Response("Invalid GuidesAndTours ID", { status: 400 });
        }

        const guidesAndTours = await GuidesAndTours.findOne({ _id: new ObjectId(id) });

        if (!guidesAndTours) {
            return new Response("GuidesAndTours not found", { status: 404 });
        }

        return new Response(JSON.stringify(guidesAndTours), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch guidesAndTours details:', error);
        return new Response("Failed to fetch guidesAndTours details", { status: 500 });
    }
};
