import Avatars from "@components/about-us/Avatars";
import {teamByProjects} from "@components/about-us/who-we-are/team-by-projects";
import {infrastructure} from "@components/about-us/who-we-are/infrastructure";
import {monitoring} from "@components/about-us/who-we-are/monitoring";

import {replaceConfigStrings} from "@utils/utils";

const TeamByProject = ({dict}) => {
    const updatedTeamByProjects = replaceConfigStrings(teamByProjects, dict);
    const updatedInfrastructure = replaceConfigStrings(infrastructure, dict);
    const updatedMonitoring = replaceConfigStrings(monitoring, dict);
    return (
        <>
            <div className={`bg-default-opacity`}>
                <Avatars header={dict.geopark.aboutUs.whoWeAre.teamByProject.title}
                         teamName={dict.geopark.aboutUs.whoWeAre.teamByProject.investigation.title}
                         team={updatedTeamByProjects} whiteText={true}/>
            </div>
            <div className={`bg-white mx-auto`}>
                <Avatars teamName={dict.geopark.aboutUs.whoWeAre.teamByProject.infrastructure.title}
                         team={updatedInfrastructure}/>
            </div>
            <div className={`bg-default-opacity`}>
                <Avatars teamName={dict.geopark.aboutUs.whoWeAre.teamByProject.monitoring.title} team={updatedMonitoring}
                         whiteText={true}/>
            </div>
        </>

    );
};

export default TeamByProject;
