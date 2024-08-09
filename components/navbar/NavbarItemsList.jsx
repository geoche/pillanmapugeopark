﻿"use client"

import "@/styles/navbar.css"

import {navbarLinks} from "@components/navbar/navbarLinks/navbarLinks";
import NavbarItem from "@components/navbar/NavBarItem";

const NavbarItemsList = () => {
    return (
        <div className={`flex-col flex lg:flex-row justify-center h-auto z-20`}>
            <div>
                {navbarLinks.map((item, index) => (
                    <NavbarItem key={index} navItemsList={item.links}/>
                ))}
            </div>
        </div>
    );
};

export default NavbarItemsList;
