import TextWithImagesAligned from "@components/TextWithImagesAligned";
import {academyText} from "@components/management/academy/academyText";
import {academyLogos} from "@components/management/academy/academyLogos";

const Academy = () => {
    return (
        <>
            <TextWithImagesAligned
                imageSources={academyLogos}
                contentAlignedRight={false}
                displayText={academyText}
                headerText={`public sector`}
            />
        </>
    );
};

export default Academy;
