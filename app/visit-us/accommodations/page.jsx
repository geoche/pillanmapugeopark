import AccommodationsGrid from "@components/visit-us/accommodations/AccommodationsGrid";
import HeaderOpacity from "@components/HeaderOpacity";

const Accommodations = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Accommodations`}/>
            <AccommodationsGrid/>
        </section>
    );
};

export default Accommodations;
