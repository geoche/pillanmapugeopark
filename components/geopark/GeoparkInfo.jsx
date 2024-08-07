import ReusableButton from "@components/ReusableButton";
import TextWithImgAndButton from "@components/TextWithImgAndButton";

const geoparkText = ["The Pillanmapu Geopark Foundation was created with the aim of establishing a UNESCO Global Geopark in the Maule Andes mountain range. " + "Geoparks are territorial management models where natural and cultural heritage is managed in a holistic manner, involving local communities through a bottom-up approach.", "We investigate the Maule Andes, generating valuable information that allows us to propose conservation and sustainable management strategies.", "We design and implement educational activities to change the way we relate to our territory.", "We promote sustainable economic development through geotourism and support for local."]

const GeoparkInfo = () => {
    return (
        <TextWithImgAndButton textToMap={geoparkText} label={`The Geopark`.toUpperCase()} buttonRefLink={`/geopark/about-us/what-we-are`} buttonText={`I want to know more!`}/>
    );
};

export default GeoparkInfo;
