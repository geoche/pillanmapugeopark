import Separator from "@components/Separator";
import ReusableButton from "@components/ReusableButton";
import Image from "next/image";

const wwdImages = [{
    imageSource: '/assets/images/geopark/doctor.png', buttonText: 'investigation'
}, {
    imageSource: '/assets/images/geopark/knight.png', buttonText: 'conservation'
}, {
    imageSource: '/assets/images/geopark/turista.png', buttonText: 'geotourism'
}, {
    imageSource: '/assets/images/geopark/teacher.png', buttonText: 'education'
}]
const WhatWeDo = () => {
    return (
        <div className={`flex items-center justify-center mx-auto bg-default `}>
            <div className="text-center text-white w-screen lg:px-32 xl:px-72">
                <div className={`py-12`}>
                    <h2 className="text-3xl font-bold mb-8 md:mb-10 px-8">WHAT DO WE DO?</h2>
                    <div className={`flex flex-col md:flex-row justify-center`}>
                        <div className={`flex flex-col lg:flex-row`}>
                            {wwdImages.map((image, index) => (
                                <div key={index} className={`mx-auto my-8 md:mx-10`}>
                                    <Image src={image.imageSource}
                                           key={index}
                                           alt={"imgContent"}
                                           width={200}
                                           height={250}
                                           className={`mb-4`}
                                    />
                                    <ReusableButton buttonText={image.buttonText}
                                                    refLink={"/geopark/about-us/what-we-do"}/>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatWeDo;
