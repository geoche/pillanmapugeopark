"use client"
import {useEffect} from "react";
import ImageSwiperWithThumbnails from "@components/ImageSwiperWithThumbnails";

function parseDescription(description) {
    return description.split(/[!?.]/).map((sentence, index) => {
        if (sentence.trim() !== "") return <p key={index} className={`p-2`}>{`${sentence.trim()}.`}</p>
    });
}

const ExperiencesDetails = ({item = {}}) => {
    
    useEffect(() => {
        if (typeof window !== "undefined") {
        }
    }, []);
    
    const allImages = [item.mainImgSrc, ...item.imagesSrc];

    return (
        <div className={`w-full h-full flex flex-col flex-center max-w-screen-7xl py-12 px-4 bg-default`}>
            <ImageSwiperWithThumbnails images={allImages}/>
            <div className={`py-4 text-center mx-auto max-w-screen-xl`}>
                <h3 className={`text-xl`}>
                    {`ABOUT ${item.title}`}
                </h3>
                {parseDescription(item.description)}
            </div>
        </div>
    );
};

export default ExperiencesDetails;
