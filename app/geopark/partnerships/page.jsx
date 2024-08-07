import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import Separator from "@components/Separator";
import Footer from "@components/Footer";
import PartnersLogos from "@components/partnership/PartnersLogos";
import CollaborationInfo from "@components/partnership/CollaborationInfo";

const Partnership = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg bg-[#6a9a8d] bg-opacity-70"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}/>
            <RoundedSeparator top={true}/>
            <div className={`bg-default pb-24`}>
                <h1 className={`text-white py-12 text-3xl text-center px-4`}>MEET THE MEMBERS OF THIS NETWORK</h1>
                <Separator/>
                <PartnersLogos/>
                <Separator/>
            </div>
            <RoundedSeparator top={false}/>
            <CollaborationInfo/>
            <Footer classNameExternal={"relative w-full"}/>
        </section>
    );
};

export default Partnership;
