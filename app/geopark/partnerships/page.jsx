import PartnersLogos from "@components/partnership/PartnersLogos";
import CollaborationInfo from "@components/partnership/CollaborationInfo";

const Partnership = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}/>
            <div className={`bg-default pb-24`}>
                <h1 className={`text-white py-12 text-3xl text-center px-4`}>MEET THE MEMBERS OF THIS NETWORK</h1>
                <PartnersLogos/>
            </div>
            <CollaborationInfo/>
        </section>
    );
};

export default Partnership;
