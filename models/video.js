﻿import {Schema, model, models} from 'mongoose';

const VideoSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    videoLink: {
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

const Video = models.Video || model('Video', VideoSchema);

export default Video;
