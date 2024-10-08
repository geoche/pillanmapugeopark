import Image from "next/image";
import logo from "@public/assets/images/logo-navbar.png";
import Link from "next/link";

const NavbarHomeLogo = ({lang}) => {
    return (
        <Link href={`/${lang}`} className="my-2 w-[15%] max-w-20 ">
            <div className="relative ">
                <Image
                    src={logo}
                    alt="logo"
                    className={`w-full h-full mx-2`}/>
            </div>
        </Link>
    );
};

export default NavbarHomeLogo;
