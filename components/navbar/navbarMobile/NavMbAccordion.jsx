"use client";
import { useState } from "react";
import NavMbAccordionItem from "@components/navbar/navbarMobile/NavMbAccordionItem";

import {geoparkLinks} from "@components/navbar/navbarLinks/geoparkLinks";
import {exploreGeoparkLinks} from "@components/navbar/navbarLinks/exploreGeoparkLinks";
import {interactiveMapLinks} from "@components/navbar/navbarLinks/iteractiveMapLinks";
import {visitUsLinks} from "@components/navbar/navbarLinks/visitUsLinks";
import {blogLinks} from "@components/navbar/navbarLinks/blogLinks";

const NavMbAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const links = [
        { title: "The Geopark", links: geoparkLinks },
        { title: "Explore the Geopark", links: exploreGeoparkLinks },
        { title: "Interactive Map", links: interactiveMapLinks },
        { title: "Visit Us", links: visitUsLinks },
        { title: "Blog", links: blogLinks },
    ];

    return (
        <div className="bg-transparent z-20">
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
