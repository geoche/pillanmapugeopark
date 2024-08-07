import Footer from "@components/Footer";
import BackgroundVideoMuted from "@components/homepage/BackgroundVideoMuted";
import SchematicMap from "@components/homepage/SchematicMap";
import Geosites from "@components/homepage/Geosites";
import GuidesAndTours from "@components/homepage/GuidesAndTours";
import Accommodations from "@components/homepage/Accommodations";
import AssosiatedInstitutions from "@components/homepage/AssosiatedInstitutions";
import Separator from "@components/Separator";
import Navbar from "@components/navbar/Navbar";

const Home = () => {

    return (
        <section className="relative h-screen w-screen overflow-x-hidden flex-col">
            <Navbar/>
            <BackgroundVideoMuted/>
            <SchematicMap/>
            <Separator/>
            <Geosites/>
            <Separator/>
            <GuidesAndTours/>
            <Separator/>
            <Accommodations/>
            <Separator/>
            <AssosiatedInstitutions/>
            <Separator/>
            <Footer classNameExternal={"relative mt-16"}/>
        </section>
    );
};

export default Home