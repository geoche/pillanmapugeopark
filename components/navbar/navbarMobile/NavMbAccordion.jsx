"use client";
import {useState} from "react";
import NavMbAccordionItem from "@components/navbar/navbarMobile/NavMbAccordionItem";

const NavMbAccordion = ({lang, updatedNavbarLinks = {}}) => {
    const language = lang;
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-transparent z-20">
            {updatedNavbarLinks.map((group, index) => (
                <div key={index}>
                    <NavMbAccordionItem
                        key={index}
                        lang={language}
                        item={group.links[0]}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                        isParentOpen={openIndex === index}
                        setOpenIndex={setOpenIndex}
                    />
                </div>
            ))}
        </div>
    );
};

export default NavMbAccordion;
