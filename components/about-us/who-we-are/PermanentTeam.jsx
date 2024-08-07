import React from 'react';
import Avatars from "@components/about-us/Avatars";

import {permanentTeam} from "@components/about-us/who-we-are/permanent-team";


const PermanentTeam = () => {
    return (
        <div className={`bg-default`}>
            <Avatars header={`PERMANENT TEAM`.toUpperCase()} team={permanentTeam}/>
        </div>
    );
};

export default PermanentTeam;
