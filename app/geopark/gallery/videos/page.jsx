﻿"use client"

import Footer from "@components/Footer";
import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import VideoGallery from "@components/gallery/video-gallery/VideoGallery";


const Videos = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <RoundedSeparator top={true}/>
            <VideoGallery/>
            <RoundedSeparator top={false}/>
            <Footer classNameExternal={"relative w-full"}/>
        </section>);
};

export default Videos;
