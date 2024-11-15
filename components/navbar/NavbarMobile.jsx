﻿"use client"

import {useState, useEffect} from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";
import {GrClose, GrMenu} from "react-icons/gr";

import NavMbAccordion from "@components/navbar/navbarMobile/NavMbAccordion";
import Link from "next/link";

const NavbarMobile = ({lang, updatedNavbarLinks = {}}) => {
    const [showModalSm, setShowModalSm] = useState(false);

    useEffect(() => {
        const handleLinkClick = (event) => {
            const linkElement = event.target.closest('a');
            if (linkElement && linkElement.tagName === 'A') {
                setShowModalSm(false);
            }
        };

        document.addEventListener('click', handleLinkClick);

        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);
    return (
        <div className={`block lg:hidden p-2 l:pr-14 flex-row`}>
            <TERipple rippleColor="white">
                <button
                    type="button"
                    className="inline-block rounded-xl border-2 border-white border-opacity-50 p-1 transition duration-150 ease-in-out"
                    onClick={() => setShowModalSm(true)}
                >
                    <GrMenu className="w-6 h-6"/>
                </button>
            </TERipple>

            {/* <!--Small modal-->*/}
            <TEModal show={showModalSm} setShow={setShowModalSm}>
                <TEModalDialog size="fullscreen">
                    <TEModalContent className={`!bg-white`}>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-lg font-bold leading-normal px-4">
                                Geopark navigation
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none"
                                onClick={() => setShowModalSm(false)}
                                aria-label="Close"
                            >
                                <GrClose className="w-6 h-6 z-0"/>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody className={`!py-0 !pb-4 !px-4`}>
                            <NavMbAccordion lang={lang} updatedNavbarLinks={updatedNavbarLinks}/>
                            <div className={`flex flex-end`}>
                                <Link href="/en">
                                    <div className={`p-2 ${lang === "en" ? "hidden" : "text-base"}`}>
                                        <span>Cambiar el idioma a: </span>
                                        <span className={`fi fi-gb`}></span>
                                    </div>
                                </Link>
                                <Link href="/es">
                                    <div className={`p-2 ${lang === "es" ? "hidden" : "text-base"}`}>
                                        <span>Change language to: </span>
                                        <span className={`fi fi-es`}></span>
                                    </div>
                                </Link>
                            </div>
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>
    );
};

export default NavbarMobile;