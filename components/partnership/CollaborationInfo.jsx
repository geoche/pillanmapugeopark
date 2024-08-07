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
        <div className="mx-auto p-4 bg-default-opacity w-full pb-32 py-20 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Strengthening collaborative work in Maule</h1>
            <Separator/>
            <div className="space-y-4 max-w-2xl flex flex-col justify-center items-center mx-auto">
                {colabInfo.map((faq, index) => (
                    <div key={index} className="w-full">
                        <button
                            onClick={() => toggleColabInfo(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <h2 className="text-xl font-bold text-center">{faq.question}</h2>
                            <IoIosArrowDown
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`mt-4 transition-all duration-300 overflow-hidden bg-neutral-500 bg-opacity-50 rounded-xl 
                            ${
                                openIndex === index ? 'max-h-screen p-4' : 'max-h-0 p-0'
                            }`}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollaborationInfo;
