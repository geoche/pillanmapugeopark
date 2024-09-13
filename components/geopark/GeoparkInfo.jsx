import TextWithImgAndButton from "@components/TextWithImgAndButton";
const GeoparkInfo = ({lang, dict}) => {
    return (
        <TextWithImgAndButton 
            sectionText={dict.geopark.geoparkInfo.sectionText} 
            label={dict.geopark.geoparkInfo.title}
            buttonRefLink={`/${lang}/geopark/about-us/what-we-are`}
            buttonText={`I want to know more!`}/>
    );
};

export default GeoparkInfo;
