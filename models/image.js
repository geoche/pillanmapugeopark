import {Schema, model, models} from 'mongoose';

const ImageSchema = new Schema({
    imageSrc: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Image = models.Image || model('Image', ImageSchema);

export default Image;
