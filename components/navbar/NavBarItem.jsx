"use client";

import NavbarDropdownItem from "@components/navbar/NavbarDropdownItem";
import NavbarSimpleItem from "@components/navbar/NavbarSimpleItem";
import Link from "next/link";

import {MdKeyboardArrowDown} from "react-icons/md";


const NavbarItem = ({lang, navItemsList = {}}) => {
    return (
        <>
            {navItemsList && navItemsList.map((item, index) => (
                <div key={index} className="group inline-block py-2">
                    {item.children ? (
                        <>
                            <button aria-haspopup="true" aria-controls="menu"
                                    className="outline-none focus:outline-none px-3 rounded-xl flex items-center">
                                <span className="pr-1 text-lg">{`${item.title}`}</span>
                                <MdKeyboardArrowDown
                                    className={`fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-300 ease-in-out`}/>
                            </button>
                            <ul id="menu"
                                className="bg-white border rounded-xl transform scale-0 group-hover:scale-100 absolute transition duration-300 ease-in-out origin-top min-w-32">
                                {item.children.map((child, childIndex) => (
                                    child.children ? (
                                        <NavbarDropdownItem title={child.title} childLinks={child.children}
                                                            key={childIndex} lang={lang}/>
                                    ) : (
                                        <NavbarSimpleItem title={child.title} refLink={child.link} key={childIndex}
                                                          lang={lang}/>
                                    )
                                ))}
                            </ul>
                        </>
                    ) : (
                        <Link href={`/${lang}${item.link}`} key={index}>
                            <span className="px-3 text-lg">{item.title}</span>
                        </Link>
                    )}
                </div>
            ))}
        </>
    );
};

export default NavbarItem;
