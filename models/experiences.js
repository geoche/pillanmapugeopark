import {Schema, model, models} from 'mongoose';

const ExperiencesSchema = new Schema({
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
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Experiences = models.Experiences || model('Experiences', ExperiencesSchema);

export default Experiences;
