"use client"
import Image from "next/image";
import dynamic from "next/dynamic";
import {GrClose} from "react-icons/gr";
import {useState, useEffect} from "react";
import AccommodationImgSwiper from "@components/visit-us/accommodations/AccommodationImgSwiper";

import {ImHome3, ImAddressBook, ImPhone, ImMail4, ImLink} from "react-icons/im";
import ReusableButton from "@components/ReusableButton";

const TEModal = dynamic(
    () => import("tw-elements-react").then(mod => mod.TEModal),
    {ssr: false}
);
const TEModalBody = dynamic(
    () => import("tw-elements-react").then(mod => mod.TEModalBody),
    {ssr: false}
);
const TEModalContent = dynamic(
    () => import("tw-elements-react").then(mod => mod.TEModalContent),
    {ssr: false}
);
const TEModalDialog = dynamic(
    () => import("tw-elements-react").then(mod => mod.TEModalDialog),
    {ssr: false}
);
const TEModalHeader = dynamic(
    () => import("tw-elements-react").then(mod => mod.TEModalHeader),
    {ssr: false}
);

function parseDescription(description) {
    return description.split(/[!?.]/).map((sentence, index) => {
        if (sentence.trim() !== "") return <p key={index} className={`p-2`}>{`${sentence.trim()}.`}</p>
    });
}

function parsePhones(phones) {
    return phones.split(/[,.]/).map((phone, index) => {
        if (phone.trim() !== "") return <p key={index}>{`${phone.trim()}`}</p>
    });
}

const AccommodationsItem = ({item = {}, index}) => {
    const [showModalSm, setShowModalSm] = useState(false);

    useEffect(() => {
        // This code will run only on the client side
        if (typeof window !== "undefined") {
            // Any client side specific code can be added here
        }
    }, []);

    const itemDetails = [
        { icon: ImHome3, text: item.facilities },
        { icon: ImAddressBook, text: item.contact.address },
        { icon: ImPhone, text: parsePhones(item.contact.phone), isNested: true },
        { icon: ImMail4, text: item.contact.email },
        { icon: ImLink, element: <ReusableButton buttonText={`Website`} refLink={item.contact.link}/> }
    ];

    return (
        <div key={index} className="p-2 w-full sm:w-1/2 lg:w-1/3 relative">
            <button onClick={() => setShowModalSm(true)} type="button" className={`w-full`}>
                <div>
                    <Image
                        src={item.mainImgSrc}
                        alt={`Accommodations ${index}`}
                        priority
                        width={800}
                        height={600}
                        className={`rounded-2xl aspect-video`}
                    />
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-tl-2xl rounded">
                    <p>{item.city}</p>
                </div>
                <div
                    className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                    <p>{item.title}</p>
                </div>
            </button>

            {showModalSm && (
                <TEModal
                    show={showModalSm}
                    setShow={setShowModalSm}
                    theme={{
                        show: "transform-none",
                        static: "!scale-[1.02]",
                        staticProperties: "transition-scale duration-300 ease-in-out",
                        wrapper:
                            "fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-default-opacity-modal",
                    }}
                >
                    <TEModalDialog size="xl">
                        <TEModalContent>
                            <TEModalHeader>
                                <h1 className="text-lg font-bold leading-normal text-white px-4">
                                    {item.title}
                                </h1>
                                <button
                                    type="button"
                                    className="box-content rounded-none border-none hover:animate-pulse"
                                    onClick={() => setShowModalSm(false)}
                                    aria-label="Close"
                                >
                                    <GrClose className="w-6 h-6 text-white text-opacity-70"/>
                                </button>
                            </TEModalHeader>
                            <TEModalBody>
                                <div
                                    className={`w-full h-full flex flex-wrap items-center flex-center max-w-screen-xl py-4`}
                                >
                                    <AccommodationImgSwiper images={item.imagesSrc}/>
                                    <div className={`py-4 text-white text-center mx-auto sm:px-6`}>
                                        <h3 className={`text-3xl`}>
                                            {`ABOUT ${item.title}`}
                                        </h3>
                                        <div className={`text-justify`}>
                                            {parseDescription(item.description)}
                                        </div>
                                    </div>

                                    <div className={`flex-wrap flex-center items-baseline text-white text-center text-sm mx-4`}>
                                        {itemDetails.map((detail = {}, index) => (
                                            <div key={index}
                                                 className={`flex-col w-1/2 md:w-1/3 xl:w-1/5 flex-center items-center pt-4`}>
                                                <detail.icon className={`w-11 h-11 text-white`}/>
                                                <span className={`min-h-24 w-auto md:min-w-44 ${detail.text ? "pt-8" : "pt-4"}`}>
                                                {detail.text ? detail.text : detail.element}
                                                </span>
                                            </div>
                                        ))}
                                    </div>                                
                                </div>
                            </TEModalBody>
                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>
            )}
        </div>
    );
};

export default AccommodationsItem;
