import { connectToDatabase } from '@utils/database';
import Accommodation from '@models/accommodation';
import { ObjectId } from 'mongodb';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return new Response("Invalid accommodation ID", { status: 400 });
        }

        const accommodation = await Accommodation.findOne({ _id: new ObjectId(id) });

        if (!accommodation) {
            return new Response("Accommodation not found", { status: 404 });
        }

        return new Response(JSON.stringify(accommodation), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch accommodation details:', error);
        return new Response("Failed to fetch accommodation details", { status: 500 });
    }
};
