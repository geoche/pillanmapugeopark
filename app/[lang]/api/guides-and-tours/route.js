// @/api/guides-and-tours/route.js

import {connectToDatabase} from '@utils/database';
import GuidesAndTours from "@models/guidesAndTours";
import {put, del} from '@vercel/blob';

export const POST = async (request) => {
    try {
        await connectToDatabase();

        const {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            type,
            contact,
            location,
        } = await request.json();

        // Validate required fields
        if (!mainImgSrc || !imagesSrc || !city || !title || !description || !type || !contact || !location) {
            return new Response("Missing required fields", {status: 400});
        }

        // Upload main image to Blob storage
        const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
        const {url: mainImgUrl} = await put(`guides-and-tours/main-${Date.now()}.png`, mainImageBuffer, {access: 'public'});

        // Upload additional images to Blob storage
        const imageUrls = await Promise.all(imagesSrc.map(async (imgSrc, index) => {
            const imageBuffer = Buffer.from(imgSrc.split(",")[1], "base64");
            const {url} = await put(`guides-and-tours/image-${Date.now()}-${index}.png`, imageBuffer, {access: 'public'});
            return url;
        }));

        // Create new Guide/Tour document
        const newGuidesAndTours = new GuidesAndTours({
            mainImgSrc: mainImgUrl,
            imagesSrc: imageUrls,
            city,
            title,
            description,
            type,
            contact,
            location,
        });

        await newGuidesAndTours.save();

        return new Response(JSON.stringify(newGuidesAndTours), {status: 201});
    } catch (error) {
        console.error('POST /api/guides-and-tours error:', error);
        return new Response("Failed to create new GuidesAndTours", {status: 500});
    }
};

/**
 * GET /api/guides-and-tours
 * Retrieves all Guides/Tours.
 */
export const GET = async () => {
    try {
        await connectToDatabase();

        const guidesAndTours = await GuidesAndTours.find({});

        return new Response(JSON.stringify(guidesAndTours), {status: 200});
    } catch (error) {
        console.error('GET /api/guides-and-tours error:', error);
        return new Response("Failed to fetch GuidesAndTours", {status: 500});
    }
};

/**
 * PATCH /api/guides-and-tours
 * Updates an existing Guide/Tour.
 */
export const PATCH = async (request) => {
    try {
        await connectToDatabase();

        const {
            id,
            mainImgSrc,
            imagesSrc, // Array of image objects with src and isNew
            city,
            title,
            description,
            type,
            contact,
            location,
            imageChanged,
            imagesChanged,
        } = await request.json();

        // Validate required fields
        if (!id || !city || !title || !description || !type || !contact || !location) {
            return new Response("Missing required fields", {status: 400});
        }

        const guide = await GuidesAndTours.findById(id);

        if (!guide) {
            return new Response("GuidesAndTours not found", {status: 404});
        }

        // Update basic fields
        guide.city = city;
        guide.title = title;
        guide.description = description;
        guide.type = type;
        guide.contact = contact;
        guide.location = location;

        // Handle main image update
        if (imageChanged && mainImgSrc) {
            await del(guide.mainImgSrc);
            // Upload new main image
            const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
            const {url: newMainImgUrl} = await put(`guides-and-tours/main-${Date.now()}.png`, mainImageBuffer, {access: 'public'});

            guide.mainImgSrc = newMainImgUrl;
        }

        // Handle additional images update
        if (imagesChanged && imagesSrc) {
            const existingImages = guide.imagesSrc; // URLs of existing images

            // Extract URLs of existing images that are still present
            const updatedExistingImages = imagesSrc
                .filter(img => !img.isNew)
                .map(img => img.src);

            // Determine which images have been removed
            const imagesToDelete = existingImages.filter(imgUrl => !updatedExistingImages.includes(imgUrl));

            // Delete removed images from Blob storage
            if (imagesToDelete.length > 0) {
                await del(imagesToDelete);
            }
            
            // Upload new images
            const newImages = imagesSrc.filter(img => img.isNew);
            const newImageUrls = await Promise.all(newImages.map(async (imgObj, index) => {
                const imageBuffer = Buffer.from(imgObj.src.split(",")[1], "base64");
                const {url} = await put(`guides-and-tours/image-${Date.now()}-${index}.png`, imageBuffer, {access: 'public'});
                return url;
            }));

            // Update imagesSrc in the guide document
            guide.imagesSrc = [...updatedExistingImages, ...newImageUrls];
        }

        await guide.save();

        return new Response(JSON.stringify(guide), {status: 200});
    } catch (error) {
        console.error('PATCH /api/guides-and-tours error:', error);
        return new Response("Failed to update the GuidesAndTours", {status: 500});
    }
};

/**
 * DELETE /api/guides-and-tours
 * Deletes a Guide/Tour and all associated images.
 */
export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const {id} = await request.json();

        if (!id) {
            return new Response("Missing guide/tour ID", {status: 400});
        }

        const guide = await GuidesAndTours.findById(id);

        if (!guide) {
            return new Response("GuidesAndTours not found", {status: 404});
        }

        // Delete main image from Blob storage
        await del(guide.mainImgSrc);

        // Delete additional images from Blob storage
        await del(guide.imagesSrc);

        // Delete the guide/tour from the database
        await GuidesAndTours.findByIdAndDelete(id);

        return new Response("GuidesAndTours deleted successfully", {status: 200});
    } catch (error) {
        console.error('DELETE /api/guides-and-tours error:', error);
        return new Response("Failed to delete the GuidesAndTours", {status: 500});
    }
};
