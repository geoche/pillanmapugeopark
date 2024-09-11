import HeaderOpacity from "@components/HeaderOpacity";
import GuidesAndToursGrid from "@components/visit-us/guides-and-tours/GuidesAndToursGrid";

const GuidesAndTours = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Guides and tour operators`}/>
            <GuidesAndToursGrid/>
        </section>
    );
};

export default GuidesAndTours;
