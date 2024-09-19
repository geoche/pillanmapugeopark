﻿"use client";
import {useEffect, useState} from 'react';
import Spinner from "@components/Spinner";
import {getYoutubeVideoId} from "@components/gallery/video-gallery/YoutubeUrlHelper";

const VideoForm = () => {
    const [videoLink, setVideoLink] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/gallery/videos');
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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

        fetchVideos().then(r => () => {
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/gallery/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({videoLink, description}),
            });
            
            if (res.ok) {
                setMessage('Video saved successfully');
                setVideoLink('');
                setDescription('');
            } else {
                setMessage('Failed to save video');
            }
        } catch (error) {
            setMessage('An error occurred');
            setTimeout(() => {
                setShowContent(true);
            }, 300);
        }
    };

    return (
        <section className={`component-section`}>
            <div className={`admin-panel-module`}>
                {loading ?
                    (
                        <div className={`form-loading`}>
                            <Spinner/>
                        </div>
                    )
                    :
                    (
                        <div className={`form-container`}>
                            <form onSubmit={handleSubmit}
                                  className={`form-main transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="mb-4">
                                    <label htmlFor="videoLink" className="block text-gray-700 font-bold mb-2">YouTube
                                        Video
                                        Link:</label>
                                    <input
                                        type="url"
                                        id="videoLink"
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description"
                                           className="block text-gray-700 font-bold mb-2">Description:</label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit"
                                        className="bg-button text-white px-4 py-2 rounded hover:bg-teal-500">
                                    Submit
                                </button>
                                {message && <p className="mt-4 text-center text-green-500">{message}</p>}
                            </form>

                            <div className={`form-content-container`}>
                                <div
                                    className={`form-content-grid transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                    {videos.map((item, index) => (
                                        <div key={index} className={` p-4 text-justify lg:w-1/2 xl:w-1/3`}>
                                            <iframe src={getYoutubeVideoId(item.videoLink)}
                                                    className="aspect-video w-full rounded-2xl"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen></iframe>
                                            <p className={`text-sm py-4 h-auto lg:min-h-48 xl:min-h-52`}>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </section>
    );
};

export default VideoForm;
