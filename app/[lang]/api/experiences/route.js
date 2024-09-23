import { connectToDatabase } from '@utils/database';
import Experiences from '@models/experiences';
import { put, del } from '@vercel/blob';

export const POST = async (request) => {
    try {
        await connectToDatabase();

        const { mainImgSrc, imagesSrc, title, description } = await request.json();

        const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
        const { url: mainImgUrl } = await put(`experiences/main-${Date.now()}.png`, mainImageBuffer, { access: 'public' });

        const imageUrls = await Promise.all(imagesSrc.map(async (imgSrc, index) => {
            const imageBuffer = Buffer.from(imgSrc.split(",")[1], "base64");
            const { url } = await put(`experiences/image-${Date.now()}-${index}.png`, imageBuffer, { access: 'public' });
            return url;
        }));

        const newExperience = new Experiences({
            mainImgSrc: mainImgUrl,
            imagesSrc: imageUrls,
            title,
            description,
        });

        await newExperience.save();

        return new Response(JSON.stringify(newExperience), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create new experience", { status: 500 });
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const experiences = await Experiences.find({});

        return new Response(JSON.stringify(experiences), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch experiences", { status: 500 });
    }
};

export const PUT = async (request) => {
    try {
        await connectToDatabase();

        const { id } = request.params;
        const updateData = await request.json();

        const updatedExperience = await Experiences.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedExperience) {
            return new Response("Experience not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedExperience), { status: 200 });
    } catch (error) {
        return new Response("Failed to update the experience", { status: 500 });
    }
};

export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const { id } = await request.json();
        
        const experience = await Experiences.findById(id);
        
        await del(experience.mainImgSrc);
        await del(experience.imagesSrc);
        

        const deletedExperience = await Experiences.findByIdAndDelete(id);

        if (!deletedExperience) {
            return new Response("Experience not found", { status: 404 });
        }

        return new Response("Experience deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete the experience", { status: 500 });
    }
};
