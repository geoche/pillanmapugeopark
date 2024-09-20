import { connectToDatabase } from '@utils/database';
import Image from '@models/image';
import { put, del } from '@vercel/blob';

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
        console.error(error);
        return new Response("Failed to fetch images from the gallery", { status: 500 });
    }
};

// PATCH method to update image caption and imageSrc
export const PATCH = async (request) => {
    const { id, caption, imageChanged, imageSrc } = await request.json();

    try {
        await connectToDatabase();

        let updatedFields = { caption };

        if (imageChanged && imageSrc) {
            // Upload new image
            const imageBuffer = Buffer.from(imageSrc.split(",")[1], "base64");
            const { url } = await put(`images/${Date.now()}.png`, imageBuffer, { access: 'public' });

            // Find the existing image to get the old image URL
            const existingImage = await Image.findById(id);

            if (!existingImage) {
                return new Response("Image not found", { status: 404 });
            }
            
            await del(existingImage.imageSrc);
            updatedFields.imageSrc = url;
        }

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        if (!updatedImage) {
            return new Response("Image not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedImage), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to update image", { status: 500 });
    }
};

// DELETE method to delete image from database and Vercel Blob storage
export const DELETE = async (request) => {
    const { id } = await request.json();

    try {
        await connectToDatabase();

        // Find the image to get the imageSrc
        const imageToDelete = await Image.findById(id);

        if (!imageToDelete) {
            return new Response("Image not found", { status: 404 });
        }
        
        await del(imageToDelete.imageSrc);
        await Image.findByIdAndDelete(id);

        return new Response("Image deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to delete image", { status: 500 });
    }
};
