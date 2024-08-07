import { connectToDatabase } from '@utils/database';
import Image from '@models/image';

export const POST = async (request) => {
    const { imageSrc, caption } = await request.json();

    try {
        await connectToDatabase();

        const newImage = new Image({
            imageSrc,
            caption
        });

        await newImage.save();

        return new Response(JSON.stringify(newImage), { status: 201 });
    } catch (error) {
        return new Response("Failed to add a new image to gallery", { status: 500 });
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const images = await Image.find({});

        return new Response(JSON.stringify(images), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch images from the gallery", { status: 500 });
    }
};
