import ReusableButton from "@components/ReusableButton";
import TextWithImgAndButton from "@components/TextWithImgAndButton";

const friendsGeoparkText = ["We bring together the efforts of all actors pursuing sustainable development in the Maule Andes.", "Are you part of an organization, with or without profit, that carries out activities in the Maule mountain range and would you like to be part of this network?", "Don't hesitate to join us!"]

const GeoparkFriends = () => {
    return (
        <TextWithImgAndButton textToMap={friendsGeoparkText} label={`Friends of the geopark network`.toUpperCase()} buttonRefLink={`/geopark/about-us/who-we-are`} buttonText={`Join us`}/>
    );
};

export default GeoparkFriends;
