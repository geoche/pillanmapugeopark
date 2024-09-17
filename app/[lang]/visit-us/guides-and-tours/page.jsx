import HeaderOpacity from "@components/HeaderOpacity";
import GuidesAndToursGrid from "@components/visit-us/guides-and-tours/GuidesAndToursGrid";
import {getDictionary} from "@app/[lang]/dictionaries";

const GuidesAndTours = async({params}) => {
    const currentLanguage = params.lang;
    const dict = await getDictionary(params.lang)
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.visitUs.guidesAndTours.header.main}/>
            <GuidesAndToursGrid lang={currentLanguage} dict={dict}/>
        </section>
    );
};

export default GuidesAndTours;
