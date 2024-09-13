import TextWithImgAndButton from "@components/TextWithImgAndButton";
const GeoparkInfo = ({lang, dict}) => {
    return (
        <TextWithImgAndButton 
            sectionText={dict.geopark.whatIsGeopark.geoparkInfo.sectionText} 
            label={dict.geopark.whatIsGeopark.geoparkInfo.title}
            buttonRefLink={`/${lang}/geopark/about-us/what-we-are`}
            buttonText={`I want to know more!`}/>
    );
};

export default GeoparkInfo;
