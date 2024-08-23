import { Schema, model, models } from 'mongoose';

const BlogNodeSchema = new Schema({
    header: {
        type: String,
    },
    text: {
        type: String,
    },
    nodeImage: {
        nodeImageSrc: {
            type: String,
        },
        nodeImageDescription: {
            type: String,
        },
        nodeImageBy: {
            type: String,
        },
    },
});

const BlogSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    title: {
        type: String,
        required: true,  // Ensure the title is required
    },
    mainImgSrc: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    blogpostBy: {
        type: String,
        required: true,
    },
    blogNode: {
        type: [BlogNodeSchema],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
