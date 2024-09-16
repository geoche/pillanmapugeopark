import HeaderOpacity from "@components/HeaderOpacity";
import GuidesAndToursGrid from "@components/visit-us/guides-and-tours/GuidesAndToursGrid";

const GuidesAndTours = async({params}) => {
    const currentLanguage = params.lang;
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Guides and tour operators`}/>
            <GuidesAndToursGrid lang={currentLanguage}/>
        </section>
    );
};

export default GuidesAndTours;
