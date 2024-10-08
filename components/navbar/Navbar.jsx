"use client"
import {useEffect, useState} from "react";
import {usePathname} from 'next/navigation'

import NavbarHomeLogo from './NavbarHomeLogo';
import "@/styles/navbar.css"

import NavbarMobile from "@components/navbar/NavbarMobile";
import NavbarItemsList from "@components/navbar/NavbarItemsList";
import Link from "next/link";
import "flag-icons/css/flag-icons.min.css";

import {navbarLinks} from "@components/navbar/navbarLinks/navbarLinks";
import {replaceConfigStrings} from "@utils/utils";

const ignoreUri = [
    "/explore/georoutes", "/explore/geosites"
]
function removeLangFromPathname(pathname) {
    const supportedLangs = ['en', 'es'];
    const segments = pathname.split('/');
    if (supportedLangs.includes(segments[1])) {
        const newSegments = segments.slice(2);
        const newPathname = '/' + newSegments.join('/');
        return newPathname === '/' ? '/' : newPathname;
    } else {
        return pathname;
    }
}

const Navbar = ({lang, dict = {}}) => {
    const [isClient, setIsClient] = useState(false);
    const NavbarMobile = isClient ? require("@components/navbar/NavbarMobile").default : () => null;

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    let updatedPathname = removeLangFromPathname(usePathname());

    const matchedUri = ignoreUri.find(uri => updatedPathname.includes(uri));

    if (matchedUri) {
        updatedPathname = matchedUri;
    }
    

    const updatedNavbarLinks = replaceConfigStrings(navbarLinks, dict);

    return (
        <nav
            className={`sticky justify-between space-x-14 lg:justify-center items-center w-full flex top-0 z-20 bg-white`}>
            <NavbarHomeLogo lang={lang}/>
            <div className={`hidden lg:flex`}>
                <NavbarItemsList lang={lang} updatedNavbarLinks={updatedNavbarLinks}/>
            </div>
            <div className={`hidden lg:flex ${lang === "en" ? "flex-row-reverse" : ""}`}>
                <Link href={`/es${updatedPathname}`}>
                    <div className={`px-1 ${lang === "es" ? "text-lg " : "text-xs p-1 opacity-50"}`}>
                        <span className={`fi fi-es`}></span>
                    </div>
                </Link>
                <Link href={`/en${updatedPathname}`}>
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
