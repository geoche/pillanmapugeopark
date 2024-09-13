import React from 'react';
import TextWithImageAligned from "@components/TextWithImageAligned";
import geoparkLogo from "@public/assets/images/footer-logo.png";
const TerritoryInfo = ({dict}) => {
    return (
        <>
            <TextWithImageAligned
                sectionText={dict.geopark.aboutUs.whatWeAre.geoparkTerritory.sectionText}
                imageSrc={geoparkLogo}
                contentAlignedRight={false}
            />
        </>
    );
};

export default TerritoryInfo;
