import Image from "next/image";
import logo from "@public/assets/images/home-logo-bck.png";
import Link from "next/link";

const NavbarHomeLogo = () => {
    return (
        <Link href="/" className="p-2 w-[15%] max-w-24">
            <div className="relative ">
                <Image
                    src={logo}
                    alt="logo"
                    className={`opacity-75 w-full h-full`}/>
            </div>
        </Link>
    );
};

export default NavbarHomeLogo;
