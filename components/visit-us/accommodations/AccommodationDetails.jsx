"use client"
import {useState, useEffect} from "react";
import AccommodationImgSwiper from "@components/visit-us/accommodations/AccommodationImgSwiper";

import {ImHome3, ImAddressBook, ImPhone, ImMail4, ImLink} from "react-icons/im";
import ReusableButton from "@components/ReusableButton";

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

const AccommodationDetails = ({item = {}, index}) => {
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
        <div
            className={`w-full h-full flex flex-wrap items-center flex-center max-w-screen-xl py-4`}
        >
            <AccommodationImgSwiper images={item.imagesSrc}/>
            <div className={`py-4 text-center mx-auto sm:px-6`}>
                <h3 className={`text-xl`}>
                    {`ABOUT ${item.title}`}
                </h3>
                <div className={`text-justify`}>
                    {parseDescription(item.description)}
                </div>
            </div>

            <div className={`flex flex-wrap flex-center items-baseline text-center text-sm mx-4`}>
                {itemDetails.map((detail = {}, index) => (
                    <div key={index}
                         className={`flex-col w-1/2 md:w-1/3 xl:w-1/5 flex-center items-center pt-4`}>
                        <detail.icon className={`w-11 h-11 `}/>
                        <span className={`min-h-24 w-auto md:min-w-44 ${detail.text ? "pt-8" : "pt-4"}`}>
                                                {detail.text ? detail.text : detail.element}
                                                </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccommodationDetails;
