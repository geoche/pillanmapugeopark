import Avatars from "@components/about-us/Avatars";

import {permanentTeam} from "@components/about-us/who-we-are/permanent-team";


const PermanentTeam = ({dict}) => {
    return (
        <div className={`bg-default`}>
            <Avatars header={dict.geopark.aboutUs.whoWeAre.permanentTeam.header} team={permanentTeam}/>
        </div>
    );
};

export default PermanentTeam;
