import SchematicMap from "@components/homepage/SchematicMap";
import TerritoryMission from "@components/territory/TerritoryMission";
import FAQ from "@components/territory/FAQ";
import TerritoryInfo from "@components/territory/TerritoryInfo";

const GeoparkTerritory = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}/>
            <div className={`bg-default`}>
                <TerritoryInfo/>
                <SchematicMap/>
            </div>
            <TerritoryMission/>
            <FAQ/>
        </section>
    );
};

export default GeoparkTerritory;