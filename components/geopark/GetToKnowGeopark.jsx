"use client"
import ImageGallery from "@components/ImageGallery";
import Separator from "@components/Separator";

import {geoparkImages} from "@components/geopark/geoparkImages";

const GetToKnowGeopark = ({dict}) => {
    return (
        <div className={`flex items-center justify-center mx-auto py-12 bg-default`}>
            <div className="w-screen">
                <h2 className={`text-h-secondary`}>{dict.geopark.getToKnowGeopark.title}</h2>
                <Separator/>
                <ImageGallery key={`image-gallery`} images={geoparkImages}/>
            </div>
        </div>
    );
};

export default GetToKnowGeopark;
