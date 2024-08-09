"use client"

import {useState} from 'react';
import {IoIosArrowDown} from "react-icons/io";

import {questionsList} from "@components/territory/questionsList";
import Separator from "@components/Separator";


const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <div className={`py-4`}>
                <h2 className={`text-h-secondary`}>Frequently Asked Questions</h2>
                <Separator/>
                <h3 className={`text-center py-4`}>Resolve your doubts here</h3>
            </div>
            <div className="space-y-4 max-w-2xl flex flex-col justify-center items-center mx-auto">
                {questionsList.map((faq, index) => (
                    <div key={index} className="w-full">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <h4 className={`text-xl`}>{faq.question}</h4>
                            <IoIosArrowDown
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`mt-4 transition-all duration-300 overflow-hidden ${
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
