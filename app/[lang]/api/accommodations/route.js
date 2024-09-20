import {connectToDatabase} from '@utils/database';
import Accommodation from '@models/accommodation';
import {del, put} from '@vercel/blob';

export const POST = async (request) => {
    try {
        await connectToDatabase();

        const {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            facilityType,
            contact,
            location,
        } = await request.json();

        // Upload main image
        const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
        const { url: mainImgUrl } = await put(`accommodations/main-${Date.now()}.png`, mainImageBuffer, { access: 'public' });

        // Upload additional images
        const imageUrls = await Promise.all(imagesSrc.map(async (imgSrc, index) => {
            const imageBuffer = Buffer.from(imgSrc.split(",")[1], "base64");
            const { url } = await put(`accommodations/image-${Date.now()}-${index}.png`, imageBuffer, { access: 'public' });
            return url;
        }));

        const newAccommodation = new Accommodation({
            mainImgSrc: mainImgUrl,
            imagesSrc: imageUrls,
            city,
            title,
            description,
            facilityType,
            contact,
            location,
        });

        await newAccommodation.save();

        return new Response(JSON.stringify(newAccommodation), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create new accommodation", { status: 500 });
    }
};

export const GET = async () => {
    try {
        await connectToDatabase();

        const accommodations = await Accommodation.find({});

        return new Response(JSON.stringify(accommodations), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch accommodations", { status: 500 });
    }
};

// PATCH method to update accommodation
export const PATCH = async (request) => {
    try {
        await connectToDatabase();

        const {
            id,
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            facilityType,
            contact,
            location,
            imageChanged,
            imagesChanged,
        } = await request.json();

        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return new Response("Accommodation not found", { status: 404 });
        }

        // Update fields
        accommodation.city = city;
        accommodation.title = title;
        accommodation.description = description;
        accommodation.facilityType = facilityType;
        accommodation.contact = contact;
        accommodation.location = location;

        // Handle main image update
        if (imageChanged && mainImgSrc) {
            // Delete old main image from Blob storage
            const oldMainImgUrl = accommodation.mainImgSrc;
            const urlObj = new URL(oldMainImgUrl);
            const pathname = urlObj.pathname;
            const blobPath = pathname.replace('/_vercel/blob/', '');
            await del(blobPath);

            // Upload new main image
            const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
            const { url: mainImgUrl } = await put(`accommodations/main-${Date.now()}.png`, mainImageBuffer, { access: 'public' });

            accommodation.mainImgSrc = mainImgUrl;
        }

        // Handle additional images update
        if (imagesChanged && imagesSrc) {
            // Delete old additional images from Blob storage
            await del(accommodation.imagesSrc);


            // Upload new additional images
            accommodation.imagesSrc = await Promise.all(imagesSrc.map(async (imgSrc, index) => {
                const imageBuffer = Buffer.from(imgSrc.split(",")[1], "base64");
                const {url} = await put(`accommodations/image-${Date.now()}-${index}.png`, imageBuffer, {access: 'public'});
                return url;
            }));
        }

        await accommodation.save();

        return new Response(JSON.stringify(accommodation), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to update the accommodation", { status: 500 });
    }
};

// DELETE method to delete accommodation and images
export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const { id } = await request.json();

        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return new Response("Accommodation not found", { status: 404 });
        }

        // Delete main image from Blob storage
        await del(accommodation.mainImgSrc);
        await del(accommodation.imagesSrc);
        
        // Delete the accommodation from the database
        await Accommodation.findByIdAndDelete(id);

        return new Response("Accommodation deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to delete the accommodation", { status: 500 });
    }
};
