import React from 'react';
import TextWithImageAligned from "@components/TextWithImageAligned";
import geoparkLogo from "@public/assets/images/footer-logo.png";
import {geoparkTerritoryText} from "@components/geopark/text/geoparkTerritoryText";
const TerritoryInfo = () => {
    return (
        <>
            <TextWithImageAligned
                displayText={geoparkTerritoryText}
                imageSrc={geoparkLogo}
                contentAlignedRight={false}
            />
        </>
    );
};

export default TerritoryInfo;
