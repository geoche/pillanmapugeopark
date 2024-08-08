import VideoGalleryItem from '@components/gallery/video-gallery/VideoGalleryItem';
import Spinner from "@components/Spinner";
import {useEffect, useState} from 'react';

const VideoGallery = () => {
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

    return (<div className={`bg-default py-12`}>
            <div className="text-center w-full">
                <h2 className="text-3xl font-bold mb-8 md:mb-10">VIDEO GALLERY</h2>
                {loading ? (<Spinner/>) : (<div
                        className={`w-full flex flex-wrap flex-center items-center px-4 2xl:px-72 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        {videos.map((item, index) => (
                            <VideoGalleryItem
                                key={`vi-${index}`}
                                videoUrl={item.videoLink}
                                description={item.description}
                            />))}
                    </div>)}
            </div>
        </div>);
};

export default VideoGallery;
