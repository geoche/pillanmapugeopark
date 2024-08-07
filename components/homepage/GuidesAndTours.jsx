import TextWithImageAligned from "@components/TextWithImageAligned";

import guidesAndToursImage from "@/public/assets/images/guides.png"

const guidesAndToursDisplayText =
    ["Explore the best of Pillanmapu Geopark with our experienced guides and trusted tour operators.",
        "Whether you're seeking an adventurous trek, a scenic tour, or a cultural experience, our guides are here to provide you with unforgettable journeys.",
        "Browse our gallery to see some of the dedicated professionals ready to make your visit extraordinary."]

const GuidesAndTours = () => {
    return (
        <TextWithImageAligned
            index={`guides-and-tour-operators`}
            headerText={"Guides and tour operators"}
            displayText={guidesAndToursDisplayText}
            imageSrc={guidesAndToursImage}
            buttonText={"See all guides and tour operators"}
            refLink={"/visit-us/guides-and-tours"}
            contentAlignedRight={true}
        />
    );
};

export default GuidesAndTours;
