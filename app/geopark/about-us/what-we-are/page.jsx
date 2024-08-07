import Footer from "@components/Footer";
import SchematicMap from "@components/homepage/SchematicMap";
import TerritoryMission from "@components/territory/TerritoryMission";
import FAQ from "@components/territory/FAQ";
import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import TerritoryInfo from "@components/territory/TerritoryInfo";

const WhatWeAre = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg bg-[#6a9a8d] bg-opacity-70"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}/>
            <RoundedSeparator top={true}/>
            <div className={`bg-default`}>
               <TerritoryInfo/>
                <SchematicMap/>
                <RoundedSeparator top={false}/>
            </div>


            <TerritoryMission/>
            <RoundedSeparator top={true}/>
            <FAQ/>
            <Footer classNameExternal={"relative w-full"}/>


        </section>
    );
};

export default WhatWeAre;