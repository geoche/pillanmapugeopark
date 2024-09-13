import PermanentTeam from "@components/about-us/who-we-are/PermanentTeam";
import TeamByProject from "@components/about-us/who-we-are/TeamByProject";
import HeaderOpacity from "@components/HeaderOpacity";
import Separator from "@components/Separator";
import {getDictionary} from "@app/[lang]/dictionaries";

const WhoWeAre = async ({params}) => {
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Who we are`}/>
            <div className={`flex flex-col bg-default py-12`}>
                <div className={`text-center`}>
                    <h2 className={`text-h-secondary`}>{dict.geopark.aboutUs.whoWeAre.header.h2}</h2>
                    <h3 className={`text-xl py-4`}>{dict.geopark.aboutUs.whoWeAre.header.h3}</h3>
                    <Separator/>
                </div>
            </div>
            <PermanentTeam dict={dict}/>
            <TeamByProject dict={dict}/>
        </section>
    );
};

export default WhoWeAre;
