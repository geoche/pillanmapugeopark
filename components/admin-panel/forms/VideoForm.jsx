"use client";
import { useEffect, useState } from 'react';
import Spinner from "@components/Spinner";
import { FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";
import { getYoutubeVideoId } from "@components/gallery/video-gallery/YoutubeUrlHelper";

const VideoForm = () => {
    const [videoLink, setVideoLink] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editVideoId, setEditVideoId] = useState(null);

    const [videoToDelete, setVideoToDelete] = useState(null);

    const fetchVideos = async () => {
        try {
            const response = await fetch('/api/gallery/videos');
            if (response.ok) {
                const data = await response.json();
                setVideos(data);
            } else {
                console.error('Failed to fetch videos');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setShowContent(true);
            }, 300);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const method = isEditMode ? 'PATCH' : 'POST';
            const apiUrl = `/api/gallery/videos`;

            const res = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: editVideoId, videoLink, description }),
            });

            if (res.ok) {
                setMessage(isEditMode ? 'Video updated successfully' : 'Video saved successfully');
                setVideoLink('');
                setDescription('');
                setIsEditMode(false);
                setEditVideoId(null);
            } else {
                setMessage('Failed to save video');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setSubmitLoading(false);
            await fetchVideos();
        }
    };

    const handleEdit = (video) => {
        setVideoLink(video.videoLink);
        setDescription(video.description);
        setEditVideoId(video._id);
        setIsEditMode(true);
    };

    const handleDelete = (video) => {
        setVideoToDelete(video);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch('/api/gallery/videos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: videoToDelete._id }),
            });

            if (res.ok) {
                setMessage('Video deleted successfully');
                await fetchVideos();
            } else {
                setMessage('Failed to delete video');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setVideoToDelete(null);
        }
    };

    const cancelDelete = () => {
        setVideoToDelete(null);
    };

    const handleCancelEdit = () => {
        setVideoLink('');
        setDescription('');
        setIsEditMode(false);
        setEditVideoId(null);
    };

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
                            className={`form-main transition-opacity duration-1000 ${
                                showContent ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="videoLink"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    YouTube Video Link:
                                </label>
                                <input
                                    type="url"
                                    id="videoLink"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                    disabled={submitLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Description:
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    rows="4"
                                    required
                                    disabled={submitLoading}
                                ></textarea>
                            </div>
                            {submitLoading ? (
                                <div className={`submit-loading`}>
                                    <Spinner />
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        className={`bg-button text-white px-4 py-2 rounded hover:bg-button-hover cursor-pointer`}
                                        disabled={submitLoading}
                                    >
                                        {isEditMode ? 'Edit' : 'Submit'}
                                    </button>
                                    {isEditMode && (
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="ml-2 cursor-pointer"
                                        >
                                            <FaUndo size={24} style={{ color: '#6a9a8d' }} />
                                        </button>
                                    )}
                                </div>
                            )}

                            {!submitLoading && message && (
                                <p className="mt-4 text-center text-green-500">{message}</p>
                            )}
                        </form>

                        <div className={`form-content-container`}>
                            <div
                                className={`form-content-grid transition-opacity duration-1000 ${
                                    showContent ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                {videos.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`relative p-4 text-justify lg:w-1/2 xl:w-1/3`}
                                    >
                                        <div className={`flex justify-end space-x-2 p-2`}>
                                            <FaEdit
                                                size={24}
                                                onClick={() => handleEdit(item)}
                                                className={`cursor-pointer ${
                                                    isEditMode && editVideoId === item._id
                                                        ? 'text-green-500'
                                                        : 'hover:text-green-500'
                                                }`}
                                            />
                                            <FaTrashAlt
                                                size={24}
                                                onClick={() => handleDelete(item)}
                                                className="cursor-pointer hover:text-red-500"
                                            />
                                        </div>
                                        <iframe
                                            src={getYoutubeVideoId(item.videoLink)}
                                            className="aspect-video w-full rounded-2xl"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                        <p
                                            className={`text-sm py-4 h-auto lg:min-h-48 xl:min-h-52`}
                                        >
                                            {item.description}
                                        </p>
                                        {/* Red veil overlay when video is being considered for deletion */}
                                        {videoToDelete && videoToDelete._id === item._id && (
                                            <div
                                                className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50 rounded-2xl pointer-events-none"
                                                style={{ zIndex: 10 }}
                                            ></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Custom confirmation modal */}
            {videoToDelete && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-white p-6 rounded-lg">
                        <p className="mb-4 text-lg">
                            Do you want to delete selected video?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoForm;
