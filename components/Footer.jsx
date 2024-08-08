import {FaFacebook, FaYoutube, FaInstagram} from "react-icons/fa"; // Importing social media icons from react-icons

import footerLogo from "@/public/assets/images/footer-logo.png";
import Image from "next/image";
import Link from "next/link";

import {geoparkInfo} from "@components/footer/geoparkInfo";
import {exploreGeopark} from "@components/footer/exploreGeopark";
import {other} from "@components/footer/other";
import shLogo from '@/public/assets/images/shlogo.svg';


export const Footer = ({classNameExternal}) => {
    return (
        <div className={`${classNameExternal} relative bg-white`}>
            <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="grid gap-16 mb-8 lg:grid-cols-6">
                    <div className="grid-cols-1 col-span-2 flex flex-between">
                        <Link href="/">
                            <div className="relative w-1/2 lg:w-[80%]">
                                <Image
                                    src={footerLogo}
                                    alt="logo"
                                    className={`w-full h-full max-w-44`}
                                />
                            </div>
                        </Link>
                        <div className=" px-4">
                            <p className="font-semibold mb-2 text-center">Social Media</p>
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
                        <div>
                            <p className="font-semibold tracking-wide text-teal-accent-400">
                                The Geopark
                            </p>
                            <ul className="mt-2 space-y-2">
                                {geoparkInfo.map((info, index) => (
                                    <li key={index}>
                                        <Link href={info.link}>{info.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold tracking-wide text-teal-accent-400">
                                Explore the Geopark
                            </p>
                            <ul className="mt-2 space-y-2">
                                {exploreGeopark.map((info, index) => (
                                    <li key={index}>
                                        <Link href={info.link}>{info.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold tracking-wide text-teal-accent-400">
                                Other
                            </p>
                            <ul className="mt-2 space-y-2">
                                {other.map((info, index) => (
                                    <li key={index}>
                                        <Link href={info.link}>{info.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col justify-between p-4 border-t border-deep-purple-accent-200 lg:flex-row ">
                    <p className="text-sm text-black">
                        Copyright © 2024 Geoparque Pillanmapu Powered by Geoparque Pillanmapu
                    </p>
                    <div className={`flex flex-row text-sm space-x-2 pt-4 lg:pt-0`}>

                        <p>Developed by</p>
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
