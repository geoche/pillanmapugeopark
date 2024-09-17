import Avatars from "@components/about-us/Avatars";

import {permanentTeam} from "@components/about-us/who-we-are/permanent-team";
import {replaceConfigStrings} from "@utils/utils";


const PermanentTeam = ({dict}) => {
    const updatedList = replaceConfigStrings(permanentTeam,dict);
    return (
        <div className={`bg-default`}>
            <Avatars header={dict.geopark.aboutUs.whoWeAre.permanentTeam.header} team={updatedList}/>
        </div>
    );
};

export default PermanentTeam;
