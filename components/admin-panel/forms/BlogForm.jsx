"use client";
import { useState, useRef, useEffect } from 'react';
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
        nodeImageBy: '',
        activeSubSection: null,
    }]);
    const [expandedNodeIndex, setExpandedNodeIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [blogPosts, setBlogPosts] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [activeSection, setActiveSection] = useState(null); // For main sections

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
            nodeImageBy: '',
            activeSubSection: null,
        }]);
        setExpandedNodeIndex(blogNodes.length);
    };

    const handleActiveNodeSubSection = (index, subSection) => {
        setBlogNodes(prevBlogNodes => {
            const newBlogNodes = [...prevBlogNodes];
            newBlogNodes[index].activeSubSection = subSection;
            return newBlogNodes;
        });
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
                nodeImageInputRefs.current.forEach(ref => {
                    if (ref) {
                        ref.value = '';
                    }
                });
                setExpandedNodeIndex(0);
            } else {
                setMessage('Failed to save blog post');
            }
        } catch (error) {
            console.log(error);
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchBlogposts = async () => {
            try {
                const res = await fetch('/api/blog');
                if (!res.ok) {
                    console.error('Failed to fetch data');
                    return;
                }
                const data = await res.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchBlogposts();
    }, []);

    return (
        <section className={`component-section`}>
            <div className={`admin-panel-module`}>
                {loading ? (
                    <div className={`form-loading`}>
                        <Spinner />
                    </div>
                ) : (
                    <div className={`form-container`}>
                        <form
                            onSubmit={handleSubmit}
                            className={`form-main max-h-[70%] overflow-y-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {/* Main Info Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'mainInfo' ? null : 'mainInfo')}
                                >
                                    Main Info
                                </h2>
                                {activeSection === 'mainInfo' && (
                                    <div>
                                        {/* Title */}
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
                                        {/* Main Image */}
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
                                        {/* Description */}
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
                                        {/* Blog Post By */}
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
                                    </div>
                                )}
                            </div>

                            {/* Sections */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'sections' ? null : 'sections')}
                                >
                                    Sections
                                </h2>
                                {activeSection === 'sections' && (
                                    <div>
                                        {blogNodes.map((node, index) => (
                                            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                                                <div className="flex justify-between items-center">
                                                    <h4
                                                        className="text-gray-700 font-bold cursor-pointer"
                                                        onClick={() => handleExpandNode(index)}
                                                    >
                                                        Section {index + 1} {expandedNodeIndex === index ? '-' : '+'}
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
                                                        {/* Sub-section Headings */}
                                                        <div>
                                                            <h5
                                                                className="cursor-pointer font-bold text-md mb-2"
                                                                onClick={() =>
                                                                    handleActiveNodeSubSection(
                                                                        index,
                                                                        node.activeSubSection === 'text' ? null : 'text'
                                                                    )
                                                                }
                                                            >
                                                                Text {node.activeSubSection === 'text' ? '-' : '+'}
                                                            </h5>
                                                            {node.activeSubSection === 'text' && (
                                                                <>
                                                                    {/* Header */}
                                                                    <div className="my-4">
                                                                        <label className="block text-gray-700 mb-2">Header:</label>
                                                                        <input
                                                                            type="text"
                                                                            value={node.header}
                                                                            onChange={(e) =>
                                                                                handleBlogNodeChange(index, 'header', e.target.value)
                                                                            }
                                                                            className="w-full p-2 border border-gray-300 rounded"
                                                                            disabled={loading}
                                                                        />
                                                                    </div>
                                                                    {/* Text */}
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 mb-2">Text:</label>
                                                                        <textarea
                                                                            value={node.text}
                                                                            onChange={(e) =>
                                                                                handleBlogNodeChange(index, 'text', e.target.value)
                                                                            }
                                                                            className="w-full p-2 border border-gray-300 rounded"
                                                                            rows="4"
                                                                            disabled={loading}
                                                                        ></textarea>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <h5
                                                                className="cursor-pointer font-bold text-md mb-2"
                                                                onClick={() =>
                                                                    handleActiveNodeSubSection(
                                                                        index,
                                                                        node.activeSubSection === 'image' ? null : 'image'
                                                                    )
                                                                }
                                                            >
                                                                Image {node.activeSubSection === 'image' ? '-' : '+'}
                                                            </h5>
                                                            {node.activeSubSection === 'image' && (
                                                                <>
                                                                    {/* Section Image */}
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 mb-2">Section Image:</label>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => handleNodeImageChange(index, e)}
                                                                            ref={(el) => (nodeImageInputRefs.current[index] = el)}
                                                                            className="w-full p-2 border border-gray-300 rounded"
                                                                            disabled={loading}
                                                                        />
                                                                    </div>
                                                                    {/* Image Description */}
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 mb-2">Image Description:</label>
                                                                        <input
                                                                            type="text"
                                                                            value={node.nodeImageDescription}
                                                                            onChange={(e) =>
                                                                                handleBlogNodeChange(
                                                                                    index,
                                                                                    'nodeImageDescription',
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            className="w-full p-2 border border-gray-300 rounded"
                                                                            disabled={loading}
                                                                        />
                                                                    </div>
                                                                    {/* Image By */}
                                                                    <div className="mb-4">
                                                                        <label className="block text-gray-700 mb-2">Image By:</label>
                                                                        <input
                                                                            type="text"
                                                                            value={node.nodeImageBy}
                                                                            onChange={(e) =>
                                                                                handleBlogNodeChange(index, 'nodeImageBy', e.target.value)
                                                                            }
                                                                            className="w-full p-2 border border-gray-300 rounded"
                                                                            disabled={loading}
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleAddBlogNode}
                                            className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover mb-2"
                                            disabled={loading}
                                        >
                                            Add Section
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            {loading ? (
                                <div className="w-full flex flex-center">
                                    <Spinner />
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            )}

                            {!loading && message && <p className="mt-4 text-center text-green-500">{message}</p>}
                        </form>
                        <div className={`form-content-container`}></div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogForm;
