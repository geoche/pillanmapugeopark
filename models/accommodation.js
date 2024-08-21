import { Schema, model, models } from 'mongoose';

const AccommodationSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    mainImgSrc: {
        type: String,
        required: true,
    },
    imagesSrc: {
        type: [String],  // Array of image URLs
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    facilityType: {
        type: [String],
        required: true,
    },
    contact: {
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: [String],
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],  // 'type' should be 'Point' for GeoJSON
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

AccommodationSchema.index({ location: "2dsphere" }); // Create a 2dsphere index for geo queries

const Accommodation = models.Accommodation || model('Accommodation', AccommodationSchema);

export default Accommodation;
