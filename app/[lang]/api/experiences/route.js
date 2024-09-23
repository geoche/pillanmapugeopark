import {connectToDatabase} from '@utils/database';
import Experiences from '@models/experiences';
import {put, del} from '@vercel/blob';

export const POST = async (request) => {
    try {
        await connectToDatabase();

        const {mainImgSrc, imagesSrc, title, description} = await request.json();

        const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
        const {url: mainImgUrl} = await put(`experiences/main-${Date.now()}.png`, mainImageBuffer, {access: 'public'});

        const imageUrls = await Promise.all(imagesSrc.map(async (imgSrc, index) => {
            const imageBuffer = Buffer.from(imgSrc.split(",")[1], "base64");
            const {url} = await put(`experiences/image-${Date.now()}-${index}.png`, imageBuffer, {access: 'public'});
            return url;
        }));

        const newExperience = new Experiences({
            mainImgSrc: mainImgUrl,
            imagesSrc: imageUrls,
            title,
            description,
        });

        await newExperience.save();

        return new Response(JSON.stringify(newExperience), {status: 201});
    } catch (error) {
        console.error(error);
        return new Response("Failed to create new experience", {status: 500});
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const experiences = await Experiences.find({});

        return new Response(JSON.stringify(experiences), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch experiences", {status: 500});
    }
};

export const PATCH = async (request) => {
    try {
        await connectToDatabase();

        const {
            id,
            mainImgSrc,
            imagesSrc,
            title,
            description,
            imageChanged,
            imagesChanged
        } = await request.json();

        const experience = await Experiences.findById(id);

        if (!experience) {
            return new Response("Experience not found", {status: 404});
        }

        experience.title = title;
        experience.description = description;

        if (mainImgSrc && imageChanged) {
            const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
            const {url: mainImgUrl} = await put(`experiences/main-${Date.now()}.png`, mainImageBuffer, {access: 'public'});
            await del(experience.mainImgSrc);
            experience.mainImgSrc = mainImgUrl;
        }

        if (imagesChanged && imagesSrc) {
            const existingImages = experience.imagesSrc; // URLs of existing images in the database

            // Extract URLs of existing images that are still present
            const updatedExistingImages = imagesSrc
                .filter((img) => !img.isNew)
                .map((img) => img.src);

            // Images to delete (existing images that are no longer in imagesSrc)
            const imagesToDelete = existingImages.filter(
                (imgUrl) => !updatedExistingImages.includes(imgUrl)
            );

            // Delete removed images from Blob storage
            if (imagesToDelete.length > 0) {
                await del(imagesToDelete);
            }


            // Upload new images
            const newImages = imagesSrc.filter((img) => img.isNew);
            const newImageUrls = await Promise.all(newImages.map(async (imgObj, index) => {
                const imageBuffer = Buffer.from(imgObj.src.split(",")[1], "base64");
                const {url} = await put(`experiences/image-${Date.now()}-${index}.png`, imageBuffer, {access: 'public'});
                return url;
            }));

            // Update imagesSrc in the accommodation document
            experience.imagesSrc = [...updatedExistingImages, ...newImageUrls];
        }

        await experience.save();

        return new Response(JSON.stringify(experience), {status: 200});


    } catch (error) {
        console.error(error);
        return new Response("Failed to update the experiences", {status: 500});

    }
};

export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const {id} = await request.json();

        const experience = await Experiences.findById(id);

        await del(experience.mainImgSrc);
        await del(experience.imagesSrc);


        const deletedExperience = await Experiences.findByIdAndDelete(id);

        if (!deletedExperience) {
            return new Response("Experience not found", {status: 404});
        }

        return new Response("Experience deleted successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete the experience", {status: 500});
    }
};
