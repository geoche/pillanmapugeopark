import TextWithImgAndButton from "@components/TextWithImgAndButton";

const GeoparkFriends = ({lang, dict}) => {
    return (
        <TextWithImgAndButton 
            sectionText={dict.geopark.geoparkFriends.sectionText} 
            label={dict.geopark.geoparkFriends.title} 
            buttonRefLink={`/${lang}/geopark/about-us/who-we-are`} 
            buttonText={dict.geopark.geoparkFriends.buttonText.joinUs}/>
    );
};

export default GeoparkFriends;
