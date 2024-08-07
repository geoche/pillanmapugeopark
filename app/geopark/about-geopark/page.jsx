"use client"

import Footer from "@components/Footer";
import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import Documentary from "@components/geopark/Documentary";
import GeoparkInfo from "@components/geopark/GeoparkInfo";
import WhatWeDo from "@components/geopark/WhatWeDo";
import GetToKnowGeopark from "@components/geopark/GetToKnowGeopark";
import GeoparkFriends from "@components/geopark/GeoparkFriends";


const GeoparkPage = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <RoundedSeparator top={true}/>
            <Documentary/>
            <RoundedSeparator top={false}/>
            <GeoparkInfo/>
            <WhatWeDo/>
            <GetToKnowGeopark/>
            <RoundedSeparator top={false}/>
            <GeoparkFriends/>
            <Footer classNameExternal={"relative w-full"}/>
        </section>);
};

export default GeoparkPage;
