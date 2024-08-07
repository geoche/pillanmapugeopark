import accommodations from "@/public/assets/images/accommodations.png";
import TextWithImageAligned from "@components/TextWithImageAligned";

const accommodationsText =
    [
        "Discover the charm and comfort of our unique lodgings.",
        "From cozy cabins to luxurious suites, each accommodation offers a perfect blend of nature and relaxation.",
        "Browse through our gallery to find the ideal stay for your visit."
    ]

const Accommodations = () => {
    return (
        <TextWithImageAligned
            index={`accommodation`}
            headerText={"Explore Our Accommodations"}
            displayText={accommodationsText}
            imageSrc={accommodations}
            buttonText={"See all accommodations"}
            refLink={"/visit-us/accommodations"}
            contentAlignedRight={false}
        />
    );
};

export default Accommodations;
