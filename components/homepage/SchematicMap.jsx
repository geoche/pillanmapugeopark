import TextWithImageAligned from "@components/TextWithImageAligned";
import schematicMap from "@/public/assets/images/schematic-map.png"

const SchematicMap = ({dict}) => {
    return (
        <TextWithImageAligned
            index={`schematic-map`}
            headerText={dict.home.schematicMap.title}
            sectionText={dict.home.schematicMap.sectionText}
            imageSrc={schematicMap}
            contentAlignedRight={true}
        />
    );
};

export default SchematicMap;
