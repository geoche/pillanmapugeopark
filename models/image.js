import {Schema, model, models} from 'mongoose';

const ImageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
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
