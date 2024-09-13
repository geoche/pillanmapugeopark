import BackgroundVideoMuted from "@components/homepage/BackgroundVideoMuted";
import SchematicMap from "@components/homepage/SchematicMap";
import Geosites from "@components/homepage/Geosites";
import GuidesAndTours from "@components/homepage/GuidesAndTours";
import Accommodations from "@components/homepage/Accommodations";
import AssosiatedInstitutions from "@components/homepage/AssosiatedInstitutions";
import Separator from "@components/Separator";
import {getDictionary} from "@app/[lang]/dictionaries";

const Home = async ({params}) => {
    const currentLang = params.lang;
    const dict = await getDictionary(params.lang);

    return (
        <div className="relative w-full h-full flex-col">
            <BackgroundVideoMuted dict={dict}/>
            <SchematicMap dict={dict}/>
            <Separator/>
            <Geosites lang={currentLang} dict={dict}/>
            <Separator/>
            <GuidesAndTours lang={currentLang} dict={dict}/>
            <Separator/>
            <Accommodations lang={currentLang} dict={dict}/>
            <Separator/>
            <AssosiatedInstitutions lang={currentLang} dict={dict}/>
        </div>
    );
};

export default Home