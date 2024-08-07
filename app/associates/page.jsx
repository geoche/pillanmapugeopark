import TerritoryMission from "@components/territory/TerritoryMission";
import FAQ from "@components/territory/FAQ";
import Footer from "@components/Footer";
import Navbar from "@components/navbar/Navbar";
import ManagementAcademy from "@app/geopark/management/academy/page";
import ManagementPublicSector from "@app/geopark/management/public-sector/page";

const Associates = () => {
    return (<div>
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg bg-[#6a9a8d] bg-opacity-70"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}>

            </div>
            <div className={`relative flex flex-col items-center px-4 mx-auto sm:px-6 p-12 bg-default`}>
                <svg
                    className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-[#6a9a8d]"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 54"
                >
                    <path
                        fill="currentColor"
                        d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
                    />
                </svg>
                
            </div>
            <ManagementAcademy/>
            <ManagementPublicSector/>
            <TerritoryMission/>
            <FAQ/>
            <Footer classNameExternal={"relative w-full"}/>
        </section>
    </div>);
};

export default Associates;
