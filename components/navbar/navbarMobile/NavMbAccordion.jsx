"use client";
import { useState } from "react";
import NavMbAccordionItem from "@components/navbar/navbarMobile/NavMbAccordionItem";

import { visitUsLinks } from "@components/navbar/navbarLinks/visitUsLinks";
import { interactiveMapLinks } from "@components/navbar/navbarLinks/iteractiveMapLinks";
import { geoparkLinks } from "@components/navbar/navbarLinks/geoparkLinks";

const NavMbAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const links = [
        { title: "Visit Us", links: visitUsLinks },
        { title: "The Geopark", links: geoparkLinks },
        { title: "Interactive Map", links: interactiveMapLinks },
    ];

    return (
        <div className="space-y-4 bg-transparent">
            {links.map((group, index) => (
                <div key={index}>
                    <NavMbAccordionItem
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
