"use client"

import {useState} from 'react';
import {IoIosArrowDown} from "react-icons/io";
import Separator from "@components/Separator";

import {colabInfo} from "@components/partnership/colabInfo";

const CollaborationInfo = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleColabInfo = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <div className={`py-4`}>
                <h2 className="text-h-secondary py-4">Strengthening collaborative work in Maule</h2>
                <Separator/>
                <h3 className={`text-center py-4`}>Resolve your doubts here</h3>
            </div>
            <div className="space-y-4 max-w-2xl flex flex-col justify-center items-center mx-auto">
            {colabInfo.map((colab, index) => (
                    <div key={index} className="w-full">
                        <button
                            onClick={() => toggleColabInfo(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <h3 className={`text-xl`}>{colab.question}</h3>
                            <IoIosArrowDown
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`mt-4 transition-all duration-300 overflow-hidden
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
