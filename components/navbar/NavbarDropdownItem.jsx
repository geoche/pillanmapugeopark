import NavbarSimpleItem from "@components/navbar/NavbarSimpleItem";
import { MdKeyboardArrowDown } from "react-icons/md";


const NavbarDropdownItem = ({lang, label, childLinks = []}) => {
    return (
        <li className="relative px-4 py-2 hover:bg-gray-100">
            <button className="w-full text-left flex items-center outline-none focus:outline-none">
                <span className="flex-1 text-nowrap">{label}</span>
                <MdKeyboardArrowDown className={`fill-current h-4 w-4 transition duration-300 ease-in-out z-10 relative`}/>
            </button>
            <ul
                id="menu-lang"
                className="bg-white border rounded-xl absolute top-0 right-0 transition duration-300 ease-in-out origin-top-left z-[999]"
            >
                {childLinks.map((item, index) => (
                    <NavbarSimpleItem key={index} label={item.label} refLink={item.link} index={index} lang={lang}/>
                ))}
            </ul>
        </li>

    );
};

export default NavbarDropdownItem;