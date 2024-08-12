import { connectToDatabase } from '@utils/database';
import Accommodation from '@models/accommodation';

// POST: Create a new accommodation
export const POST = async (request) => {
    try {
        await connectToDatabase();

        const {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            facilities,
            contact,
            location,
        } = await request.json();

        const newAccommodation = new Accommodation({
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            facilities,
            contact,
            location,
        });

        await newAccommodation.save();

        return new Response(JSON.stringify(newAccommodation), { status: 201 });
    } catch (error) {
        return new Response("Failed to create new accommodation", { status: 500 });
    }
};

// GET: Retrieve all accommodations
export const GET = async () => {
    try {
        await connectToDatabase();

        const accommodations = await Accommodation.find({});

        return new Response(JSON.stringify(accommodations), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch accommodations", { status: 500 });
    }
};

// GET: Retrieve a single accommodation by ID
export const GET_BY_ID = async (request) => {
    try {
        await connectToDatabase();

        const { id } = request.params;

        const accommodation = await Accommodation.findById(id);

        if (!accommodation) {
            return new Response("Accommodation not found", { status: 404 });
        }

        return new Response(JSON.stringify(accommodation), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch the accommodation", { status: 500 });
    }
};

// PUT: Update an accommodation by ID
export const PUT = async (request) => {
    try {
        await connectToDatabase();

        const { id } = request.params;
        const updateData = await request.json();

        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedAccommodation) {
            return new Response("Accommodation not found", { status: 404 });
        }

        return new Response(JSON.stringify(updatedAccommodation), { status: 200 });
    } catch (error) {
        return new Response("Failed to update the accommodation", { status: 500 });
    }
};

// DELETE: Delete an accommodation by ID
export const DELETE = async (request) => {
    try {
        await connectToDatabase();

        const { id } = request.params;

        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);

        if (!deletedAccommodation) {
            return new Response("Accommodation not found", { status: 404 });
        }

        return new Response("Accommodation deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete the accommodation", { status: 500 });
    }
};
