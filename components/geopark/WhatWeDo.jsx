import Separator from "@components/Separator";
import ReusableButton from "@components/ReusableButton";
import Image from "next/image";
import {whatWeDoSources} from "@components/homepage/sources/whatWeDoSources";
const WhatWeDo = () => {
    return (
        <div className={`flex items-center justify-center mx-auto bg-default`}>
            <div className="w-screen">
                <div className={`py-12`}>
                    <h2 className={`text-h-secondary`}>WHAT DO WE DO?</h2>
                    <Separator/>
                    <div className={`flex flex-col md:flex-row flex-center py-4`}>
                        <div className={`flex flex-col lg:flex-row`}>
                            {whatWeDoSources.map((image, index) => (
                                <div key={index} className={`flex flex-col flex-center mx-4`}>
                                    <Image src={image.imageSource}
                                           key={index}
                                           alt={"imgContent"}
                                           width={200}
                                           height={250}
                                           className={`m-4`}
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
