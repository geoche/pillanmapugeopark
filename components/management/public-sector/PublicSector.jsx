import TextWithImagesAligned from "@components/TextWithImagesAligned";

import {publicSectorLogos} from "@components/management/public-sector/publicSectorLogos";
import {publicSectorText} from "@components/management/public-sector/publicSectorText";
const PublicSector = () => {
    return (
        <TextWithImagesAligned
            imageSources={publicSectorLogos}
            contentAlignedRight={true}
            displayText={publicSectorText}
            headerText={`public sector`}
        />
    );
};

export default PublicSector;
