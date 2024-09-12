"use client"
import {useEffect, useState} from "react";
import NavbarHomeLogo from './NavbarHomeLogo';
import "@/styles/navbar.css"

import NavbarMobile from "@components/navbar/NavbarMobile";
import NavbarItemsList from "@components/navbar/NavbarItemsList";
import Link from "next/link";
import "flag-icons/css/flag-icons.min.css";

const Navbar = ({lang}) => {
    const [isClient, setIsClient] = useState(false);
    const NavbarMobile = isClient ? require("@components/navbar/NavbarMobile").default : () => null;

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <nav
            className={`sticky justify-between space-x-14 lg:justify-center items-center w-full flex top-0 z-10 bg-white`}>
            <NavbarHomeLogo lang={lang}/>
            <div className={`hidden lg:flex`}>
                <NavbarItemsList lang={lang}/>
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
            <NavbarMobile lang={lang}/>
        </nav>
    );
};

export default Navbar;
