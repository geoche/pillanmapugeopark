import AccommodationsGridWModal from "@components/visit-us/accommodations/AccommodationsGridWModal";
import HeaderOpacity from "@components/HeaderOpacity";

const Accommodations = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Accommodations`}/>
            <AccommodationsGridWModal/>
        </section>
    );
};

export default Accommodations;
