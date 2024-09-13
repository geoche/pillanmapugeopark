import TextWithImgAndButton from "@components/TextWithImgAndButton";

const GeoparkFriends = ({lang, dict}) => {
    return (
        <TextWithImgAndButton 
            sectionText={dict.geopark.whatIsGeopark.geoparkFriends.sectionText} 
            label={dict.geopark.whatIsGeopark.geoparkFriends.title} 
            buttonRefLink={`/${lang}/geopark/about-us/who-we-are`} 
            buttonText={dict.geopark.whatIsGeopark.geoparkFriends.buttonText.joinUs}/>
    );
};

export default GeoparkFriends;
