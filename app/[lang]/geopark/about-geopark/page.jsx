import Documentary from "@components/geopark/Documentary";
import GeoparkInfo from "@components/geopark/GeoparkInfo";
import WhatWeDo from "@components/geopark/WhatWeDo";
import GetToKnowGeopark from "@components/geopark/GetToKnowGeopark";
import GeoparkFriends from "@components/geopark/GeoparkFriends";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";


const GeoparkPage = async ({params}) => {
    const currentLang = params.lang;
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.header}/>
            <Documentary dict={dict}/>
            <GeoparkInfo lang={currentLang} dict={dict}/>
            <WhatWeDo lang={currentLang} dict={dict}/>
            <GetToKnowGeopark dict={dict} />
            <GeoparkFriends lang={currentLang} dict={dict}/>
        </section>);
};

export default GeoparkPage;
