"use client"
import {useEffect, useState} from "react";
import NavbarHomeLogo from './NavbarHomeLogo';
import "@/styles/navbar.css"

import NavbarMobile from "@components/navbar/NavbarMobile";
import NavbarItemsList from "@components/navbar/NavbarItemsList";
import Link from "next/link";
import "flag-icons/css/flag-icons.min.css";

import {navbarLinks} from "@components/navbar/navbarLinks/navbarLinks";
import {replaceConfigStrings} from "@utils/utils";

const Navbar = ({lang, dict = {}}) => {
    const [isClient, setIsClient] = useState(false);
    const NavbarMobile = isClient ? require("@components/navbar/NavbarMobile").default : () => null;

    useEffect(() => {
        setIsClient(true);
    }, []);

    const updatedNavbarLinks = replaceConfigStrings(navbarLinks, dict);

    return (
        <nav
            className={`sticky justify-between space-x-14 lg:justify-center items-center w-full flex top-0 z-10 bg-white`}>
            <NavbarHomeLogo lang={lang}/>
            <div className={`hidden lg:flex`}>
                <NavbarItemsList lang={lang} updatedNavbarLinks={updatedNavbarLinks}/>
            </div>
            <div className={`hidden lg:flex ${lang === "en" ? "flex-row-reverse" : ""}`}>
                <Link href="/es">
                    <div className={`px-1 ${lang === "es" ? "text-lg " : "text-xs p-1 opacity-50"}`}>
                        <span className={`fi fi-es`}></span>
                    </div>
                </Link>
                <Link href="/en">
                    <div className={`px-1 ${lang === "en" ? "text-lg" : "text-xs p-1 opacity-50"}`}>
                        <span className={`fi fi-gb`}></span>
                    </div>
                </Link>
            </div>
            <NavbarMobile lang={lang} updatedNavbarLinks={updatedNavbarLinks}/>
        </nav>
    );
};

export default Navbar;
