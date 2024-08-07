import TextWithImageAligned from "@components/TextWithImageAligned";
import schematicMap from "@/public/assets/images/schematic-map.png"

const schematicMapText =
    ["13,300 km2 of territory, equivalent to 1.4% of the continental national surface, " +
    "which we are working to certify as a UNESCO Global Geopark and transform it into a global example of sustainable territorial management.",
        "The Pillanmapu Geopark project covers the pre-mountain and mountain range areas of the municipalities of Romeral, Curicó, Molina, San Clemente, Colbún and Linares.",
        "Some of the most emblematic places are the Laguna del Maule, the Cajón del Achibueno, the Valley of the Condors, the Siete Tazas National Park or the Altos de Lircay National Reserve."
    ];

const SchematicMap = () => {
    return (
        <TextWithImageAligned
            index={`schematic-map`}
            headerText={"Territory"}
            displayText={schematicMapText}
            imageSrc={schematicMap}
            contentAlignedRight={true}
        />
    );
};

export default SchematicMap;
