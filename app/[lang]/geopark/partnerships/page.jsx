import PartnersLogos from "@components/partnership/PartnersLogos";
import CollaborationInfo from "@components/partnership/CollaborationInfo";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const Partnership = async ({params}) => {
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.partnerships.header}/>
            <div className={`bg-default`}>
                <PartnersLogos/>
                <CollaborationInfo dict={dict}/>
            </div>
        </section>
    );
};

export default Partnership;
