"use client"

import Documentary from "@components/geopark/Documentary";
import GeoparkInfo from "@components/geopark/GeoparkInfo";
import WhatWeDo from "@components/geopark/WhatWeDo";
import GetToKnowGeopark from "@components/geopark/GetToKnowGeopark";
import GeoparkFriends from "@components/geopark/GeoparkFriends";
import HeaderOpacity from "@components/HeaderOpacity";


const GeoparkPage = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`About Geopark`}/>
            <Documentary/>
            <GeoparkInfo/>
            <WhatWeDo/>
            <GetToKnowGeopark/>
            <GeoparkFriends/>
        </section>);
};

export default GeoparkPage;
