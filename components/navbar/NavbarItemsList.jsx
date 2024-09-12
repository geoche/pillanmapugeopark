"use client"
import "@/styles/navbar.css"
import NavbarItem from "@components/navbar/NavBarItem";

const NavbarItemsList = ({lang, updatedNavbarLinks ={}}) => {

    return (
        <div className={`flex-col flex lg:flex-row justify-center h-auto z-20`}>
            <div>
                {updatedNavbarLinks.map((item, index) => (
                    <NavbarItem key={index} navItemsList={item.links} lang={lang} />
                ))}
            </div>
        </div>
    );
};

export default NavbarItemsList;
