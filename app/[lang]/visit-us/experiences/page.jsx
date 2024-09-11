import HeaderOpacity from "@components/HeaderOpacity";
import ExperiencesGrid from "@components/visit-us/experiences/ExperiencesGrid";

const Experiences = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Experiences`}/>
            <ExperiencesGrid/>
        </section>
    );
};

export default Experiences;
