import {Schema, model, models} from 'mongoose';

const EventSchema = new Schema({
    eventShortDesc: {
        type: String,
        required: true,
    },
    eventFullDesc: {
        type: String,
        required: true,
    },
    eventImgSrc: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
