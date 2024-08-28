"use client"
import {useEffect} from "react";

import {ImSearch, ImAddressBook, ImPhone, ImMail4, ImLink, } from "react-icons/im";
import ReusableButton from "@components/ReusableButton";
import ImageSwiperWithThumbnails from "@components/ImageSwiperWithThumbnails";

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
function parseTypes(types) {
    return types.map((type, index) => {
        if (type.trim() !== "") return <p key={index}>{`${type.trim()}`}</p>
    });
}

const GuidesAndToursDetails = ({item = {}}) => {
    useEffect(() => {
        // This code will run only on the client side
        if (typeof window !== "undefined") {
            // Any client side specific code can be added here
        }
    }, []);

    const allImages = [item.mainImgSrc, ...item.imagesSrc];


    const itemDetails = [
        {icon: ImSearch, text: parseTypes(item.type)},
        {icon: ImAddressBook, text: item.contact.address},
        {icon: ImPhone, text: parsePhones(item.contact.phone), isNested: true},
        {icon: ImMail4, text: item.contact.email},
        {icon: ImLink, element: <ReusableButton buttonText={`Website`} refLink={item.contact.link}/>}
    ];

    return (
        <div className={`w-full h-full flex flex-col flex-center max-w-screen-7xl py-12 px-4 bg-default`}>
            <ImageSwiperWithThumbnails images={allImages}/>
            <div className={`py-4 text-center mx-auto max-w-screen-xl`}>
                <h3 className={`text-xl`}>
                    {`ABOUT ${item.title}`}
                </h3>
                {parseDescription(item.description)}
            </div>

            <div className={`flex flex-wrap flex-between text-sm max-w-screen-7xl mx-auto`}>
                {itemDetails.map((detail = {}, index) => (
                    <div key={index} className={`flex flex-col ${index > 2 ? "w-full" : "w-1/3"} xl:w-1/5 flex-center p-4`}>
                        <detail.icon className={`w-11 h-11 `}/>
                        <span className={`${index === 3 ? "min-h-2 xl:min-h-32" : "min-h-32"} mt-4 text-center`}>
                                                {detail.text ? detail.text : detail.element}
                                                </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuidesAndToursDetails;
