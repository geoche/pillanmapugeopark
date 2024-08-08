"use client"

import VideoGallery from "@components/gallery/video-gallery/VideoGallery";


const Videos = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <VideoGallery/>
        </section>);
};

export default Videos;
