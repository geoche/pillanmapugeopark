import AccommodationsGridWModal from "@components/visit-us/accommodations/AccommodationsGridWModal";

const Accommodations = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <AccommodationsGridWModal/>
        </section>
    );
};

export default Accommodations;
