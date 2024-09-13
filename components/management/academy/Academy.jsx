import TextWithImagesAligned from "@components/TextWithImagesAligned";
import {academyLogos} from "@components/management/academy/academyLogos";

const Academy = ({dict}) => {
    return (
        <>
            <TextWithImagesAligned
                imageSources={academyLogos}
                contentAlignedRight={false}
                sectionText={dict.geopark.geoparkManagement.academy.sectionText}
                headerText={dict.geopark.geoparkManagement.academy.header}
            />
        </>
    );
};

export default Academy;
