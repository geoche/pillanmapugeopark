import SchematicMap from "@components/homepage/SchematicMap";
import HeaderOpacity from "@components/HeaderOpacity";
import TerritoryDocumentary from "@components/geopark/TerritoryDocumentary";
import {getDictionary} from "@app/[lang]/dictionaries";

const GeoparkTerritory = async ({params}) => {
    const currentLang = params.lang;
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Pillanmapu Geopark Territory`}/>
            <div className={`bg-default`}>
                <SchematicMap dict={dict}/>
                <TerritoryDocumentary/>
            </div>
        </section>
    );
};

export default GeoparkTerritory;