import TextWithImageAligned from "@components/TextWithImageAligned";
import guidesAndToursImage from "@/public/assets/images/guides.png"

const GuidesAndTours = ({lang, dict}) => {
    return (
        <TextWithImageAligned
            index={`guides-and-tour-operators`}
            headerText={dict.home.guidesAndTours.title}
            sectionText={dict.home.guidesAndTours.sectionText}
            imageSrc={guidesAndToursImage}
            buttonText={dict.home.guidesAndTours.buttonText.guidesAndTours}
            refLink={`${lang}/visit-us/guides-and-tours`}
            contentAlignedRight={true}
        />
    );
};

export default GuidesAndTours;
