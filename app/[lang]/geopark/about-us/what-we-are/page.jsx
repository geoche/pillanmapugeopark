import SchematicMap from "@components/homepage/SchematicMap";
import TerritoryMission from "@components/territory/TerritoryMission";
import FAQ from "@components/territory/FAQ";
import TerritoryInfo from "@components/territory/TerritoryInfo";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const WhatWeAre = async ({params}) => {
    const currentLanguage = params.lang;
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.aboutUs.whatWeAre.header}/>
            <div className={`bg-default`}>
                <TerritoryInfo dict={dict}/>
                <SchematicMap dict={dict}/>
            </div>
            <TerritoryMission dict={dict}/>
            <FAQ dict={dict}/>
        </section>
    );
};

export default WhatWeAre;