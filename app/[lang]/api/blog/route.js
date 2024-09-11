import { connectToDatabase } from '@utils/database';
import Blog from '@models/blog';
import { put } from '@vercel/blob';

export const POST = async (request) => {
    try {
        // Destructure all required fields from the request body
        const { title, mainImgSrc, description, blogpostBy, blogNodes } = await request.json();

        // Ensure that all required fields are present
        if (!title || !mainImgSrc || !description || !blogpostBy || !blogNodes) {
            return new Response("Missing required fields", { status: 400 });
        }

        // Convert the main image source from base64 to a buffer
        const imageBuffer = Buffer.from(mainImgSrc.split(",")[1], "base64");

        // Upload the main image to the Vercel Blob Storage
        const { url: mainImageUrl } = await put(`blogs/main/${Date.now()}.png`, imageBuffer, { access: 'public' });

        // Process each blog node, uploading images and constructing node data
        const blogNodesWithUrls = await Promise.all(blogNodes.map(async (node, index) => {
            let nodeImageUrl = null;
            if (node.nodeImageSrc) {
                const nodeImageBuffer = Buffer.from(node.nodeImageSrc.split(",")[1], "base64");
                const { url } = await put(`blogs/nodes/${Date.now()}-${index}.png`, nodeImageBuffer, { access: 'public' });
                nodeImageUrl = url;
            }
            return {
                header: node.header,
                text: node.text,
                nodeImage: {
                    nodeImageSrc: nodeImageUrl,
                    nodeImageDescription: node.nodeImageDescription,
                    nodeImageBy: node.nodeImageBy
                }
            };
        }));

        // Connect to the database
        await connectToDatabase();

        // Create a new blog post document
        const newBlog = new Blog({
            title,  // Ensure title is included here
            mainImgSrc: mainImageUrl,
            description,
            blogpostBy,
            blogNode: blogNodesWithUrls,
        });

        // Save the new blog post to the database
        await newBlog.save();

        // Return a success response with the newly created blog post data
        return new Response(JSON.stringify(newBlog), { status: 201 });
    } catch (error) {
        console.error("Error creating blog post:", error);
        return new Response("Failed to add a new blog post", { status: 500 });
    }
};


export const GET = async () => {
    try {
        await connectToDatabase();

        const blogs = await Blog.find({});

        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch blog posts", { status: 500 });
    }
};
