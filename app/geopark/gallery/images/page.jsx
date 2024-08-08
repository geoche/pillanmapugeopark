"use client"

import PhotoGallery from "@components/gallery/image-gallery/PhotoGallery";


const Photos = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <PhotoGallery/>
        </section>);
};

export default Photos;
