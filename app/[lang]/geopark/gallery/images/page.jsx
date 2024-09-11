"use client"
import PhotoGallery from "@components/gallery/image-gallery/PhotoGallery";
import HeaderOpacity from "@components/HeaderOpacity";

const Photos = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Photo gallery`}/>
            <PhotoGallery/>
        </section>);
};

export default Photos;
