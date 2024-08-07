"use client"

import {useState} from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";
import {RiMenuFold4Fill} from "react-icons/ri";
import { GrClose } from "react-icons/gr";

import NavbarItemsList from "@components/navbar/NavbarItemsList";


const NavbarMobile = () => {
    const [showModalSm, setShowModalSm] = useState(false);

    return (
        <div className={`block lg:hidden p-2 l:pr-14 flex-row`}>
            <div className="space-x-2">
                <TERipple rippleColor="white">
                    <button
                        type="button"
                        className="inline-block rounded-xl border-2 border-white border-opacity-50 p-1 transition duration-150 ease-in-out hover:animate-pulse"
                        onClick={() => setShowModalSm(true)}
                    >
                        <RiMenuFold4Fill className="w-6 h-6 text-white"/>
                    </button>
                </TERipple>
            </div>

            {/* <!--Small modal-->*/}
            <TEModal show={showModalSm} setShow={setShowModalSm}>
                <TEModalDialog size="fullscreen">
                    <TEModalContent>
                        <TEModalHeader>
                            {/* <!--Modal title--> */}
                            <h5 className="text-lg font-bold leading-normal text-white px-4">
                                Geopark navigation
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:animate-pulse"
                                onClick={() => setShowModalSm(false)}
                                aria-label="Close"
                            >
                                <GrClose className="w-6 h-6 text-white text-opacity-70"/>
                            </button>
                        </TEModalHeader>
                        {/* <!--Modal body--> */}
                        <TEModalBody>
                            <NavbarItemsList/>
                        </TEModalBody>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>
    );
};

export default NavbarMobile;