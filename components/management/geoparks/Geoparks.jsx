import React from 'react';
import TextWithImagesAligned from "@components/TextWithImagesAligned";
import {geoparksLogos} from "@components/management/geoparks/geoparksLogos";

const Geoparks = ({dict}) => {
    return (
        <div className={`bg-default`}>
            <TextWithImagesAligned
                imageSources={geoparksLogos}
                contentAlignedRight={false}
                sectionText={dict.geopark.geoparkManagement.geoparks.sectionText}
                headerText={dict.geopark.geoparkManagement.geoparks.header}
            />
        </div>
    );
};

export default Geoparks;
