import TextWithImageAligned from "@components/TextWithImageAligned";
import accommodations from "@/public/assets/images/accommodations.png";

const Accommodations = ({lang, dict}) => {
    return (
        <TextWithImageAligned
            index={`accommodation`}
            headerText={dict.home.accommodations.title}
            sectionText={dict.home.accommodations.sectionText}
            imageSrc={accommodations}
            buttonText={"See all accommodations"}
            refLink={`${lang}/visit-us/accommodations`}
            contentAlignedRight={false}
        />
    );
};

export default Accommodations;
