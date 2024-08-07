"use client"

import {useState} from 'react';
import {IoIosArrowDown} from "react-icons/io";

import {questionsList} from "@components/territory/questionsList";


const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto p-4 bg-default w-full pb-32 py-12 text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
            <h2 className="mb-12 text-center">Resolve your doubts here</h2>
            <div className="space-y-4 max-w-2xl flex flex-col justify-center items-center mx-auto">
                {questionsList.map((faq, index) => (
                    <div key={index} className="w-full">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <h2 className="text-xl font-medium">{faq.question}</h2>
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
