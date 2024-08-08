"use client"

import Documentary from "@components/geopark/Documentary";
import GeoparkInfo from "@components/geopark/GeoparkInfo";
import WhatWeDo from "@components/geopark/WhatWeDo";
import GetToKnowGeopark from "@components/geopark/GetToKnowGeopark";
import GeoparkFriends from "@components/geopark/GeoparkFriends";


const GeoparkPage = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <Documentary/>
            <GeoparkInfo/>
            <WhatWeDo/>
            <GetToKnowGeopark/>
            <GeoparkFriends/>
        </section>);
};

export default GeoparkPage;
