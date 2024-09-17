import AccommodationsGrid from "@components/visit-us/accommodations/AccommodationsGrid";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const Accommodations = async({params}) => {
    const currentLanguage = params.lang;
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.visitUs.accommodations.header.main}/>
            <AccommodationsGrid lang={currentLanguage} dict={dict}/>
        </section>
    );
};

export default Accommodations;
