"use client"
import {useEffect, useState} from "react";
import NavbarHomeLogo from './NavbarHomeLogo';
import "@/styles/navbar.css"

import NavbarMobile from "@components/navbar/NavbarMobile";
import NavbarItemsList from "@components/navbar/NavbarItemsList";

const Navbar = () => {
    const [isClient, setIsClient] = useState(false);
    const NavbarMobile = isClient ? require("@components/navbar/NavbarMobile").default : () => null;

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <nav
            className={`sticky justify-between space-x-14 lg:justify-center items-center w-full flex top-0 z-10 bg-white`}>
            <NavbarHomeLogo/>
            <div className={`hidden lg:flex`}>
                <NavbarItemsList/>
            </div>
            <NavbarMobile/>
        </nav>
    );
};

export default Navbar;
