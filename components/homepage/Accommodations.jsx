import TextWithImageAligned from "@components/TextWithImageAligned";
import accommodations from "@/public/assets/images/accommodations.png";

const Accommodations = ({lang, dict}) => {
    return (
        <TextWithImageAligned
            index={`accommodation`}
            headerText={dict.home.accommodations.title}
            sectionText={dict.home.accommodations.sectionText}
            imageSrc={accommodations}
            buttonText={dict.home.accommodations.buttonText.accommodations}
            refLink={`${lang}/visit-us/accommodations`}
            contentAlignedRight={false}
        />
    );
};

export default Accommodations;
