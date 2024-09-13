import geosites from "@/public/assets/images/geosites.png";
import TextWithImageAligned from "@components/TextWithImageAligned";

const Geosites = ({dict, lang}) => {
    return (
        <TextWithImageAligned
            index={`geosites`}
            headerText={dict.home.geosites.title}
            sectionText={dict.home.geosites.sectionText}
            imageSrc={geosites}
            buttonText={"See all geosites"}
            refLink={`${lang}/explore/geosites`}
            contentAlignedRight={false}
        />
    );
};

export default Geosites;
