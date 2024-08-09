import BackgroundVideoMuted from "@components/homepage/BackgroundVideoMuted";
import SchematicMap from "@components/homepage/SchematicMap";
import Geosites from "@components/homepage/Geosites";
import GuidesAndTours from "@components/homepage/GuidesAndTours";
import Accommodations from "@components/homepage/Accommodations";
import AssosiatedInstitutions from "@components/homepage/AssosiatedInstitutions";
import Separator from "@components/Separator";

const Home = () => {

    return (
        <div className="relative w-full h-full flex-col">
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
        </div>
    );
};

export default Home