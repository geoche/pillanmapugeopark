"use client"

import Documentary from "@components/geopark/Documentary";
import GeoparkInfo from "@components/geopark/GeoparkInfo";
import WhatWeDo from "@components/geopark/WhatWeDo";
import GetToKnowGeopark from "@components/geopark/GetToKnowGeopark";
import GeoparkFriends from "@components/geopark/GeoparkFriends";
import RoundedSeparator from "@components/RoundedSeparator";


const GeoparkPage = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-56 flex flex-center`}>
                <h1 className={`text-white text-3xl`}>What's a Geopark</h1>
            </div>
            <RoundedSeparator top={true}/>
            <Documentary/>
            <GeoparkInfo/>
            <WhatWeDo/>
            <GetToKnowGeopark/>
            <GeoparkFriends/>
        </section>);
};

export default GeoparkPage;
