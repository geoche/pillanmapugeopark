import SchematicMap from "@components/homepage/SchematicMap";
import HeaderOpacity from "@components/HeaderOpacity";
import TerritoryDocumentary from "@components/geopark/TerritoryDocumentary";

const GeoparkTerritory = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Pillanmapu Geopark Territory`}/>
            <div className={`bg-default`}>
                <SchematicMap/>
                <TerritoryDocumentary/>
            </div>
        </section>
    );
};

export default GeoparkTerritory;