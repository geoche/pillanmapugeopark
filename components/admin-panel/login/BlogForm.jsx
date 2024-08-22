"use client"
import { useState, useRef } from 'react';
import Spinner from "@components/Spinner";

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [description, setDescription] = useState('');
    const [blogpostBy, setBlogpostBy] = useState('');
    const [blogNodes, setBlogNodes] = useState([{
        header: '',
        text: '',
        nodeImageSrc: null,
        nodeImageDescription: '',
        nodeImageBy: ''
    }]);
    const [expandedNodeIndex, setExpandedNodeIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const mainImageInputRef = useRef(null);
    const nodeImageInputRefs = useRef([]);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setMainImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setMainImage(null);
        }
    };

    const handleNodeImageChange = (index, e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const newBlogNodes = [...blogNodes];
            newBlogNodes[index].nodeImageSrc = reader.result;
            setBlogNodes(newBlogNodes);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            const newBlogNodes = [...blogNodes];
            newBlogNodes[index].nodeImageSrc = null;
            setBlogNodes(newBlogNodes);
        }
    };

    const handleAddBlogNode = () => {
        setBlogNodes([...blogNodes, {
            header: '',
            text: '',
            nodeImageSrc: null,
            nodeImageDescription: '',
            nodeImageBy: ''
        }]);
        setExpandedNodeIndex(blogNodes.length);
    };

    const handleRemoveBlogNode = (index) => {
        const newBlogNodes = [...blogNodes];
        newBlogNodes.splice(index, 1);
        setBlogNodes(newBlogNodes);
        if (expandedNodeIndex >= index && expandedNodeIndex > 0) {
            setExpandedNodeIndex(expandedNodeIndex - 1);
        }
    };

    const handleBlogNodeChange = (index, field, value) => {
        const newBlogNodes = [...blogNodes];
        newBlogNodes[index][field] = value;
        setBlogNodes(newBlogNodes);
    };

    const handleExpandNode = (index) => {
        setExpandedNodeIndex(index === expandedNodeIndex ? null : index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    mainImgSrc: mainImage,
                    description,
                    blogpostBy,
                    blogNodes
                }),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (res.ok) {
                setMessage('Blog post saved successfully');
                setTitle('');
                setMainImage(null);
                setDescription('');
                setBlogpostBy('');
                setBlogNodes([{
                    header: '',
                    text: '',
                    nodeImageSrc: null,
                    nodeImageDescription: '',
                    nodeImageBy: ''
                }]);
                mainImageInputRef.current.value = '';
                nodeImageInputRefs.current.forEach(ref => ref.value = '');
                setExpandedNodeIndex(0);
            } else {
                setMessage('Failed to save blog post');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="mainImage" className="block text-gray-700 font-bold mb-2">Main Image:</label>
                <input
                    type="file"
                    id="mainImage"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    ref={mainImageInputRef}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    required
                    disabled={loading}
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="blogpostBy" className="block text-gray-700 font-bold mb-2">Blog Post By:</label>
                <input
                    type="text"
                    id="blogpostBy"
                    value={blogpostBy}
                    onChange={(e) => setBlogpostBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Blog Nodes:</label>
                {blogNodes.map((node, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-gray-700 font-bold cursor-pointer" onClick={() => handleExpandNode(index)}>
                                Node {index + 1} {expandedNodeIndex === index ? '-' : '+'}
                            </h4>
                            {blogNodes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBlogNode(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                                    disabled={loading}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        {expandedNodeIndex === index && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Header:</label>
                                    <input
                                        type="text"
                                        value={node.header}
                                        onChange={(e) => handleBlogNodeChange(index, 'header', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Text:</label>
                                    <textarea
                                        value={node.text}
                                        onChange={(e) => handleBlogNodeChange(index, 'text', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        rows="4"
                                        disabled={loading}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Node Image:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleNodeImageChange(index, e)}
                                        ref={el => nodeImageInputRefs.current[index] = el}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Image Description:</label>
                                    <input
                                        type="text"
                                        value={node.nodeImageDescription}
                                        onChange={(e) => handleBlogNodeChange(index, 'nodeImageDescription', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Image By:</label>
                                    <input
                                        type="text"
                                        value={node.nodeImageBy}
                                        onChange={(e) => handleBlogNodeChange(index, 'nodeImageBy', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        disabled={loading}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddBlogNode}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                    disabled={loading}
                >
                    + Add Blog Node
                </button>
            </div>

            {loading ?
                <div className="w-full flex flex-center">
                    <Spinner />
                </div> : (
                    <button
                        type="submit"
                        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500"
                        disabled={loading}
                    >
                        Submit
                    </button>
                )}

            {!loading && message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default BlogForm;
