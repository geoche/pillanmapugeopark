import TextWithImgAndButton from "@components/TextWithImgAndButton";
import {geoparkInfoText} from "@components/homepage/text/geoparkInfoText";
const GeoparkInfo = () => {
    return (
        <TextWithImgAndButton textToMap={geoparkInfoText} label={`The Geopark`.toUpperCase()}
                              buttonRefLink={`/geopark/about-us/what-we-are`} buttonText={`I want to know more!`}/>
    );
};

export default GeoparkInfo;
