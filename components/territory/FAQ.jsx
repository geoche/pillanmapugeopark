"use client"

import {useState} from 'react';
import {IoIosArrowDown} from "react-icons/io";

import Separator from "@components/Separator";
import {questionsList} from "@components/territory/questionsList";
import {replaceConfigStrings} from "@utils/utils";

const FAQ = ({dict}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const updatedQuestionsList = replaceConfigStrings(questionsList, dict);


    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <div className={`py-4`}>
                <h2 className={`text-h-secondary`}>{dict.geopark.aboutUs.whatWeAre.faq.header.h2}</h2>
                <Separator/>
                <h3 className={`text-center py-4`}>{dict.geopark.aboutUs.whatWeAre.faq.header.h3}</h3>
            </div>
            <div className="space-y-4 max-w-2xl flex flex-col mx-auto">
                {updatedQuestionsList.map((faq, index) => (
                    <div key={index} className="w-full">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between"
                        >
                            <h4 className={`text-xl text-left`}>{faq.question}</h4>
                            <IoIosArrowDown
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`mt-4 transition-all duration-300 overflow-hidden text-justify ${
                                openIndex === index ? 'max-h-screen' : 'max-h-0'
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

export default FAQ;
