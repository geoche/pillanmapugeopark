import TextWithImagesAligned from "@components/TextWithImagesAligned";
import {publicSectorLogos} from "@components/management/public-sector/publicSectorLogos";

const PublicSector = ({dict}) => {
    return (
        <TextWithImagesAligned
            imageSources={publicSectorLogos}
            contentAlignedRight={true}
            sectionText={dict.geopark.geoparkManagement.publicSector.sectionText}
            headerText={dict.geopark.geoparkManagement.publicSector.header}
        />
    );
};

export default PublicSector;
