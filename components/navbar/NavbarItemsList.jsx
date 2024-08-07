"use client"

import "@/styles/navbar.css"

import {geoparkLinks} from "@components/navbar/navbarLinks/geoparkLinks";
import {exploreGeoparkLinks} from "@components/navbar/navbarLinks/exploreGeoparkLinks";
import {interactiveMapLinks} from "@components/navbar/navbarLinks/iteractiveMapLinks";
import {visitUsLinks} from "@components/navbar/navbarLinks/visitUsLinks";
import {blogLinks} from "@components/navbar/navbarLinks/blogLinks";
import NavbarItem from "@components/navbar/NavBarItem";

const NavbarItemsList = () => {
    return (
        <>
            <NavbarItem navItemsList={geoparkLinks}/>
            <NavbarItem navItemsList={exploreGeoparkLinks}/>
            <NavbarItem navItemsList={interactiveMapLinks}/>
            <NavbarItem navItemsList={visitUsLinks}/>
            <NavbarItem navItemsList={blogLinks}/>
        </>
    );
};

export default NavbarItemsList;
