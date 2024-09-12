"use client";
import { useState } from "react";
import NavMbAccordionItem from "@components/navbar/navbarMobile/NavMbAccordionItem";

import {navbarLinks} from "@components/navbar/navbarLinks/navbarLinks";

const NavMbAccordion = ({lang}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    return (
        <div className="bg-transparent z-20">
            {navbarLinks.map((group, index) => (
                <div key={index}>
                    <NavMbAccordionItem
                        key={index}
                        lang={lang}
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
