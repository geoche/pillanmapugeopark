"use client";

import NavbarDropdownItem from "@components/navbar/NavbarDropdownItem";
import NavbarSimpleItem from "@components/navbar/NavbarSimpleItem";
import Link from "next/link";

const NavbarItem = ({ navItemsList = [], isInMobileView}) => {
    return (
        <div className="antialiased py-1.5">
            {navItemsList && navItemsList.map((item, index) => (
                <div key={index} className="group inline-block">
                    {item.children ? (
                        <>
                            <button aria-haspopup="true" aria-controls="menu"
                                    className="outline-none focus:outline-none px-3 rounded-xl flex items-center">
                                <span className="pr-1 font-semibold flex-1 text-white">{item.label}</span>
                                <span>
                                    <svg
                                        className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out text-white"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </span>
                            </button>
                            <ul id="menu"
                                className="bg-white border rounded-xl transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
                                {item.children.map((child, childIndex) => (
                                    child.children ? (
                                        <NavbarDropdownItem label={child.label} childLinks={child.children} key={childIndex} />
                                    ) : (
                                        <NavbarSimpleItem label={child.label} refLink={child.link} key={childIndex} />
                                    )
                                ))}
                            </ul>
                        </>
                    ) : (
                        <div >
                            <Link href={item.link} key={index}>
                                <p className={`text-white font-semibold px-3`}>{item.label}</p></Link>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NavbarItem;
