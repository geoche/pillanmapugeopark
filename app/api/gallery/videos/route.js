import { connectToDatabase } from '@utils/database';
import Video from '../../../../models/video';

export const POST = async (request) => {
    const { videoLink, description } = await request.json();

    try {
        await connectToDatabase();

        const newVideo = new Video({
            videoLink,
            description,
        });

        await newVideo.save();

        return new Response(JSON.stringify(newVideo), { status: 201 });
    } catch (error) {
        return new Response("Failed to add a new video to gallery", { status: 500 });
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const videos = await Video.find();

        return new Response(JSON.stringify(videos), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch videos from gallery", { status: 500 });
    }
};

export const PATCH = async (request) => {
    const { id, videoLink, description } = await request.json();

    try {
        await connectToDatabase();

        const updatedVideo = await Video.findByIdAndUpdate(id, { videoLink, description }, { new: true });

        if (!updatedVideo) {
            return new Response("Video not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedVideo), { status: 200 });
    } catch (error) {
        return new Response("Failed to update video", { status: 500 });
    }
};

export const DELETE = async (request) => {
    const { id } = await request.json();

    try {
        await connectToDatabase();

        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return new Response("Video not found", { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Video deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response("Failed to delete video", { status: 500 });
    }
};
