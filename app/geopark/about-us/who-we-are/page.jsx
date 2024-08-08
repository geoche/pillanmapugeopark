import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import Footer from "@components/Footer";
import PermanentTeam from "@components/about-us/who-we-are/PermanentTeam";
import TeamByProject from "@components/about-us/who-we-are/TeamByProject";
import Separator from "@components/Separator";


const WhoWeAre = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <div className={`flex flex-col py-12 bg-default`}>
                <div className={`text-center space-y-2 mx-4 md:mx-24 `}>
                    <h1 className={`text-3xl`}>WE ARE A TEAM</h1>
                    <p className={`text-lg`}>Who loves working in the service of nature, culture and the people who
                        inhabit the magical territories of the Maule mountain range.</p>
                </div>

            </div>
            <div className={`bg-default pb-24`}>
                <PermanentTeam/>
                <TeamByProject/>
            </div>
        </section>
    );
};

export default WhoWeAre;
