import {FaFacebook, FaYoutube, FaInstagram} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import FooterColumns from "@components/footer/FooterColumns";

import footerLogo from "@/public/assets/images/Logo-PillanMapu.svg";
import shLogo from '@/public/assets/images/shlogo.svg';

import {footerLinks} from "@components/footer/footerLinks";
import {replaceConfigStrings} from "@utils/utils";

export const Footer = ({lang, dict}) => {
    const updatedNavbarLinks = replaceConfigStrings(footerLinks, dict);
    return (
        <div className={`relative bg-white`}>
            <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="grid gap-16 mb-8 lg:grid-cols-6">
                    <div className="grid-cols-1 col-span-2 flex flex-between">
                        <Link href={`/${lang}`}>
                            <div className="relative">
                                <Image
                                    src={footerLogo}
                                    alt="logo"
                                    className={`w-full h-full`}
                                />
                            </div>
                        </Link>
                        <div className="px-4">
                            <p className="font-semibold mb-2 text-center">{dict.footer.socialMedia}</p>
                            <div className="flex space-x-4 text-center">
                                <Link href={"https://www.facebook.com/GeoparquePillanmapu"}
                                      passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaFacebook className="h-8 w-8 text-blue-600"/>
                                    </a>
                                </Link>
                                <Link href={"https://www.instagram.com/geoparque_pillanmapu/"}
                                      passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaInstagram className="h-8 w-8 text-pink-500"/>
                                    </a>
                                </Link>
                                <Link href={"https://www.youtube.com/channel/UCSXuT2VA_a2NbveRIC-XbSA"}
                                      passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaYoutube className="h-8 w-8 text-red-500"/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-32 lg:col-span-4 md:grid-cols-3">
                        <FooterColumns lang={lang} links={updatedNavbarLinks}/>
                    </div>
                </div>
                <div
                    className="flex flex-col justify-between p-4 border-t border-deep-purple-accent-200 lg:flex-row ">
                    <p className="text-sm text-black">
                        {dict.footer.copyright}
                    </p>
                    <div className={`flex flex-row text-sm space-x-2 pt-4 lg:pt-0`}>

                        <p>{dict.footer.developedBy}</p>
                        <Link href={`https://softwarehut.com/`}
                              passHref legacyBehavior>
                            <a target="_blank">
                                <Image
                                    src={shLogo}
                                    alt="SoftwareHut Logo"
                                    width={150}
                                    height={100}
                                />
                            </a>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
