import { Schema, model, models } from 'mongoose';

const GuidesAndToursSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    mainImgSrc: {
        type: String,
        required: true,
    },
    imagesSrc: {
        type: [String],
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
    type: {
        type: [String],
        required: true,
    },
    contact: {
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
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

GuidesAndToursSchema.index({ location: "2dsphere" }); // Create a 2dsphere index for geo queries

const GuidesAndTours = models.GuidesAndTours || model('GuidesAndTours', GuidesAndToursSchema);

export default GuidesAndTours;
