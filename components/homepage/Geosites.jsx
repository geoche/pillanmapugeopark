import geosites from "@/public/assets/images/geosites.png";
import TextWithImageAligned from "@components/TextWithImageAligned";

const geositesText =
    [
        "Discover the unique and stunning geosites within the Pillanmapu Geopark.",
        "From majestic mountains to serene lakes, our geosites showcase the natural beauty and geological heritage of the region.",
        "Browse our gallery to see some of the most remarkable locations and get inspired for your next adventure."
    ];

const Geosites = ({lang}) => {
    return (
        <TextWithImageAligned
            index={`geosites`}
            headerText={"Geosites"}
            displayText={geositesText}
            imageSrc={geosites}
            buttonText={"See all geosites"}
            refLink={"/explore/geosites"}
            contentAlignedRight={false}
        />
    );
};

export default Geosites;
