"use client"

import {useState} from 'react';
import {IoIosArrowDown} from "react-icons/io";
import Separator from "@components/Separator";

import {colabInfo} from "@components/partnership/colabInfo";
import {getValueByKey} from "@utils/utils";

export function updateNestedTranslations(linksArray, json) {
    return linksArray.map(link => {
        const updatedLink = {...link};
        Object.keys(updatedLink).forEach(key => {
            updatedLink[key] = getValueByKey(json, updatedLink[key]) || updatedLink[key];
        });

        if (link.children) {
            updatedLink.children = updateNestedTranslations(link.children, json);
        }

        return updatedLink;
    });
}

const CollaborationInfo = ({dict}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleColabInfo = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const colabInfoProcessed = updateNestedTranslations(colabInfo, dict);

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <div className={`py-4`}>
                <h2 className="text-h-secondary py-4">{dict.geopark.partnerships.collaborationInfo.header.h2}</h2>
                <Separator/>
                <h3 className={`text-center py-4`}>{dict.geopark.partnerships.collaborationInfo.header.h3}</h3>
            </div>
            <div className="space-y-4 max-w-2xl flex flex-col mx-auto">
                {colabInfoProcessed.map((colab, index) => (
                    <div key={index} className="w-full">
                        <button
                            onClick={() => toggleColabInfo(index)}
                            className="w-full flex justify-between items-center"
                        >
                            <h3 className={`text-xl`}>{colab.question}</h3>
                            <IoIosArrowDown
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`mt-4 text-justify transition-all duration-300 overflow-hidden
                            ${
                                openIndex === index ? 'max-h-screen' : 'max-h-0 p-0'
                            }`}
                        >
                            <p>{colab.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollaborationInfo;
