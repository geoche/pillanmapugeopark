"use client"
import { useEffect, useState } from "react";
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
        <div className="mx-auto flex w-full h-[55%] md:h-1/2 lg:h-1/3 min-h-72 max-w-7xl xl justify-between px-2 py-5 absolute top-0.5 left-1/2 transform -translate-x-1/2 lg:mt-0 z-10">
            <NavbarHomeLogo />
            <div className={`hidden lg:flex pr-0 md:pr-12 flex-row mt-0 lg:mt-12 xl:mt-20 max-h-16`}>
                <NavbarItemsList/>
            </div>
            <NavbarMobile/>
        </div>
    );
};

export default Navbar;
