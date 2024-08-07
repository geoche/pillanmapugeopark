"use client"

import NavbarSimpleItem from "@components/navbar/NavbarSimpleItem";

const NavbarDropdownItem = ({label, childLinks = []}) => {
    return (
        <li className="rounded-xl relative px-4 py-2 hover:bg-gray-100">
            <button aria-haspopup="true" aria-controls="menu-lang"
                    className="w-full text-left flex items-center outline-none focus:outline-none">
                <span className="pr-1 flex-1 text-nowrap">{label}</span>
                <span className="mr-auto">
                                <svg
                                    className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </span>
            </button>
            <ul
                id="menu-lang"
                className="bg-white border rounded-xl absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left"
            >
                {childLinks.map((item, index) => (
                    <NavbarSimpleItem key={index} label={item.label} refLink={item.link} index={index}/>
                ))}
            </ul>
        </li>

    );
};

export default NavbarDropdownItem;