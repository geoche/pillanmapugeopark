import Separator from "@components/Separator";
import ReusableButton from "@components/ReusableButton";
import Image from "next/image";
import {whatWeDoSources} from "@components/homepage/sources/whatWeDoSources";

import {getValueByKey} from "@utils/utils";

function updateTranslations(linksArray, json) {
    return linksArray.map(link => {
        const updatedLink = { ...link };
        updatedLink.buttonText = getValueByKey(json, link.buttonText) || link.buttonText;

        if (link.children) {
            updatedLink.children = updateTranslations(link.children, json);
        }

        return updatedLink;
    });
}
const WhatWeDo = ({lang, dict}) => {
    const sources = updateTranslations(whatWeDoSources, dict);
    return (
        <div className={`flex items-center justify-center mx-auto bg-default`}>
            <div className="w-screen">
                <div className={`py-12`}>
                    <h2 className={`text-h-secondary`}>{dict.geopark.whatIsGeopark.whatWeDo.title}</h2>
                    <Separator/>
                    <div className={`flex flex-col md:flex-row flex-center py-4`}>
                        <div className={`flex flex-col lg:flex-row`}>
                            {sources.map((image, index) => (
                                <div key={index} className={`flex flex-col flex-center mx-4`}>
                                    <Image src={image.imageSource}
                                           key={index}
                                           alt={"imgContent"}
                                           width={200}
                                           height={250}
                                           className={`m-4`}
                                    />
                                    <ReusableButton buttonText={image.buttonText}
                                                    refLink={`/${lang}/geopark/about-us/what-we-do`}/>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatWeDo;
