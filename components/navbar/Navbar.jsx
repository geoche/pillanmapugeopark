"use client"
import {useEffect, useState} from "react";
import NavbarHomeLogo from './NavbarHomeLogo';
import "@/styles/navbar.css"

import NavbarMobile from "@components/navbar/NavbarMobile";
import NavbarItemsList from "@components/navbar/NavbarItemsList";
import Link from "next/link";

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
            <div className={`hidden lg:flex`}>
                <Link href="/en">
                    <div className={`p-4 ${lang === "en" ? "text-base" : "text-sm"}`}>
                        EN
                    </div>
                </Link>
                <Link href="/es">
                    <div className={`p-4 ${lang === "es" ? "text-base" : "text-sm"}`}>
                        ES
                    </div>
                </Link>
            </div>
            <NavbarMobile lang={lang}/>
        </nav>
    );
};

export default Navbar;
