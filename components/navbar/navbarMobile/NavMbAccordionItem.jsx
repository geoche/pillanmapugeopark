"use client";
import {useState, useEffect, useRef} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";
import Link from "next/link";

const NavMbAccordionItem = ({lang, item, isOpen, onToggle, isParentOpen, setOpenIndex}) => {
    const [isChildOpen, setIsChildOpen] = useState(null);
    const contentRef = useRef(null);
    const hasChildren = item.children && item.children.length > 0;

    const handleChildToggle = (index) => {
        setIsChildOpen(isChildOpen === index ? null : index);
    };

    useEffect(() => {
        const handleLinkClick = (event) => {
            const linkElement = event.target.closest("a");
            if (linkElement && linkElement.tagName === "A") {
                setOpenIndex(null);
                setIsChildOpen(null);
            }
        };

        document.addEventListener("click", handleLinkClick);

        return () => {
            document.removeEventListener("click", handleLinkClick);
        };
    }, [setOpenIndex]);

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                if (hasChildren) {
                    onToggle();
                    setIsChildOpen(null);
                }
            }}>
                {hasChildren ? (
                    <button className="flex items-center w-full justify-between">
                        <p>{item.title}</p>
                        <MdKeyboardArrowDown
                            className={`transition-transform duration-300 ${
                                isOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </button>
                ) : (
                    <Link href={`/${lang}${item.link}`}>
                        <p className="">{item.title}</p>
                    </Link>
                )}
            </div>
            {hasChildren && (
                <div
                    ref={contentRef}
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="pl-4">
                        {item.children.map((child, index) => (
                            <NavMbAccordionItem
                                lang={lang}
                                key={index}
                                item={child}
                                isOpen={isChildOpen === index}
                                onToggle={() => handleChildToggle(index)}
                                isParentOpen={isChildOpen === index}
                                setOpenIndex={setOpenIndex}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavMbAccordionItem;
