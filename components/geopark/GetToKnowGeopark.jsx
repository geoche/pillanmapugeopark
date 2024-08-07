import ImageGallery from "@components/ImageGallery";
import Separator from "@components/Separator";

import {geoparkImages} from "@components/geopark/geoparkImages";

const GetToKnowGeopark = () => {
    return (
        <div className={`flex items-center justify-center mx-auto py-12 bg-default`}>
            <div className="text-center text-white w-screen lg:px-32 xl:px-72">
                <h2 className="text-3xl font-bold mb-8 md:mb-10">GET TO KNOW THE GEOPARK</h2>
                <ImageGallery key={`image-gallery`} images={geoparkImages}/>
                <Separator/>
            </div>
        </div>
    );
};

export default GetToKnowGeopark;
