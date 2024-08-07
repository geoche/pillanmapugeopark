import Image from "next/image";
import logo from "@public/assets/images/home-logo.png";
import Link from "next/link";

const NavbarHomeLogo = () => {
    return (
        <Link href="/" className="flex-shrink-0 max-w-16 max-h-16 lg:max-w-48 lg:max-h-44 md:max-w-28 md:max-h-28 sm:max-w-16 sm:max-h-16">
            <div className="relative">
                <Image
                    src={logo}
                    alt="logo"
                    className="w-16 md:w-28 lg:w-full"/>
            </div>
        </Link>
    );
};

export default NavbarHomeLogo;
