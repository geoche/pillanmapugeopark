import Link from "next/link";

const NavbarSimpleItem = ({lang, refLink, label, index}) => {
    return (
        <Link href={`/${lang}${refLink}`} key={`link-${index}`}>
            <li key={index} className="rounded-xl w-full hover:bg-gray-100 px-4 py-2 text-nowrap">{label}</li>
        </Link>
    );
};

export default NavbarSimpleItem;