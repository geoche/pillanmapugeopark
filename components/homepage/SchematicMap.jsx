import TextWithImageAligned from "@components/TextWithImageAligned";
import schematicMap from "@/public/assets/images/schematic-map.png"
import {schematicMapText} from "@components/geopark/text/shematicMapText";

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
