import PermanentTeam from "@components/about-us/who-we-are/PermanentTeam";
import TeamByProject from "@components/about-us/who-we-are/TeamByProject";
import HeaderOpacity from "@components/HeaderOpacity";
import Separator from "@components/Separator";

const WhoWeAre = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Who we are`}/>
            <div className={`flex flex-col bg-default py-12`}>
                <div className={`text-center`}>
                    <h2 className={`text-h-secondary`}>WE ARE A TEAM</h2>
                    <h3 className={`text-xl py-4`}>Who loves working in the service of nature, culture and the people who
                        inhabit the magical territories of the Maule mountain range.</h3>
                    <Separator/>
                </div>
            </div>
            <PermanentTeam/>
            <TeamByProject/>
        </section>
    );
};

export default WhoWeAre;
