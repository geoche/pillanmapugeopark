import PartnersLogos from "@components/partnership/PartnersLogos";
import CollaborationInfo from "@components/partnership/CollaborationInfo";
import HeaderOpacity from "@components/HeaderOpacity";

const Partnership = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Meet the members of our network`}/>
            <div className={`bg-default`}>
                <PartnersLogos/>
                <CollaborationInfo/>
            </div>
        </section>
    );
};

export default Partnership;
