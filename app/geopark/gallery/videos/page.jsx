"use client"
import VideoGallery from "@components/gallery/video-gallery/VideoGallery";
import HeaderOpacity from "@components/HeaderOpacity";

const Videos = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Video gallery`}/>
            <VideoGallery/>
        </section>);
};

export default Videos;
