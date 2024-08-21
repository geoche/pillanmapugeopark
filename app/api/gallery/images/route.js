import { connectToDatabase } from '@utils/database';
import Image from '@models/image';
import { put } from '@vercel/blob';

export const POST = async (request) => {
    const { imageSrc, caption } = await request.json();

    try {
        const imageBuffer = Buffer.from(imageSrc.split(",")[1], "base64");

        const { url } = await put(`images/${Date.now()}.png`, imageBuffer, { access: 'public' });

        await connectToDatabase();

        const newImage = new Image({
            imageSrc: url,
            caption
        });

        await newImage.save();

        return new Response(JSON.stringify(newImage), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to add a new image to the gallery", { status: 500 });
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