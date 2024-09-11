import { connectToDatabase } from '@utils/database';
import Blog from '@models/blog';
import { ObjectId } from 'mongodb';

export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const { id } = params;
        if (!ObjectId.isValid(id)) {
            return new Response("Invalid blogpost ID", { status: 400 });
        }

        const blogpost = await Blog.findOne({ _id: new ObjectId(id) });

        if (!blogpost) {
            return new Response("Blogpost not found", { status: 404 });
        }

        return new Response(JSON.stringify(blogpost), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch blogpost details:', error);
        return new Response("Failed to fetch blogpost details", { status: 500 });
    }
};
