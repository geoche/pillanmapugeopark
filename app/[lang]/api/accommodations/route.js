import {connectToDatabase} from '@utils/database';
import Accommodation from '@models/accommodation';
import {put} from '@vercel/blob';

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

        const mainImageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");
        const {url: mainImgUrl} = await put(`accommodations/main-${Date.now()}.png`, mainImageBuffer, {access: 'public'});

        const imageUrls = await Promise.all(imagesSrc.map(async (imgSrc, index) => {
            const imageBuffer = Buffer.from(imgSrc.split(",")[1], "base64");
            const {url} = await put(`accommodations/image-${Date.now()}-${index}.png`, imageBuffer, {access: 'public'});
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

        return new Response(JSON.stringify(newAccommodation), {status: 201});
    } catch (error) {
        console.error(error);
        return new Response("Failed to create new accommodation", {status: 500});
    }
};
export const GET = async () => {
    try {
        await connectToDatabase();

        const accommodations = await Accommodation.find({});

        return new Response(JSON.stringify(accommodations), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch accommodations", {status: 500});
    }
};

export const PUT = async (request) => {
    try {
        await connectToDatabase();

        const {id} = request.params;
        const updateData = await request.json();

        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updateData, {new: true});

        if (!updatedAccommodation) {
            return new Response("Accommodation not found", {status: 404});
        }

        return new Response(JSON.stringify(updatedAccommodation), {status: 200});
    } catch (error) {
        return new Response("Failed to update the accommodation", {status: 500});
    }
};

export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const {id} = request.params;

        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);

        if (!deletedAccommodation) {
            return new Response("Accommodation not found", {status: 404});
        }

        return new Response("Accommodation deleted successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete the accommodation", {status: 500});
    }
};
