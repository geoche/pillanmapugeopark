import React from 'react';
import TextWithImageAligned from "@components/TextWithImageAligned";
import geoparkLogo from "@public/assets/images/footer-logo.png";

const geoparkTerritoryTextTop =
    [
        "The Pillanmapu Geopark Foundation was created with the sole purpose of managing the territory of the Maule Andes to turn it into a world example of sustainable territorial management. To achieve the established goal, our main objective is to certify it as a UNESCO Global Geopark, a task on which we have been working hard since 2019 in collaboration with local communities, authorities and the productive private sector.",
        "Located in the Andes mountain range of the Maule region, the territory of the Pillanmapu Geopark has places of high geological heritage value, called geosites, as well as places that stand out for their biological and cultural value. The geological processes that shaped this section of the mountain range are deeply interrelated with its ecosystems, which in turn have allowed human development in its valleys and mountains for at least 8,000 years.",
        "UNESCO Global Geoparks are territorial management models that seek the sustainable development of their territories through ongoing collaborative work with local communities, authorities, different state institutions, academia and the productive private sector.",
        "Within Geoparks, heritage, both natural and cultural, is studied and managed so that present and future generations can make sustainable use of it through tourism, educational and scientific activities. By raising awareness of the importance of the geological heritage of the area in history and present-day society, as well as of the biological and cultural heritage, UNESCO Global Geoparks give local people a sense of pride in their region and strengthen their identification with the area."
    ]

const TerritoryInfo = () => {
    return (
        <>
            <TextWithImageAligned
                displayText={geoparkTerritoryTextTop}
                imageSrc={geoparkLogo}
                contentAlignedRight={false}
            />
        </>
    );
};

export default TerritoryInfo;
