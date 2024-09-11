import SchematicMap from "@components/homepage/SchematicMap";
import TerritoryMission from "@components/territory/TerritoryMission";
import FAQ from "@components/territory/FAQ";
import TerritoryInfo from "@components/territory/TerritoryInfo";

const WhatWeAre = () => {
    return (
        <section className={`component-section`}>
            <div className={`bg-default`}>
                <TerritoryInfo/>
                <SchematicMap/>
            </div>
            <TerritoryMission/>
            <FAQ/>
        </section>
    );
};

export default WhatWeAre;