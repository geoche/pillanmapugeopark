import AccommodationsGrid from "@components/visit-us/accommodations/AccommodationsGrid";
import HeaderOpacity from "@components/HeaderOpacity";

const Accommodations = async({params}) => {
    const currentLanguage = params.lang;
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Accommodations`}/>
            <AccommodationsGrid lang={currentLanguage}/>
        </section>
    );
};

export default Accommodations;
