import PageUnderConstruction from "@components/PageUnderConstruction";

const InteractiveMap = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <PageUnderConstruction/>
        </section>);
};

export default InteractiveMap;
