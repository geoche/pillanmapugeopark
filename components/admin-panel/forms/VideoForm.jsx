"use client";
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
                }, 1); // Short delay to ensure smooth transition
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
        }
    };

    return (
        <section className="component-section">
            <div className="form-container">
                {loading ?
                    (
                        <div className={`w-full h-screen flex flex-center`}>
                            <Spinner/>
                        </div>)
                    :
                    (
                        <div className="flex flex-row justify-end w-[95%]">
                            <form onSubmit={handleSubmit}
                                  className="w-[30%] p-4 my-4 bg-white rounded shadow-md fixed left-10 z-10">
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

                            <div className={`w-[65%] min-h-[44rem]`}>
                                <div
                                    className={`w-full flex flex-wrap transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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
