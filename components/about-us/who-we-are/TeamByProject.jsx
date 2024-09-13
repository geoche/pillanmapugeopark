import Avatars from "@components/about-us/Avatars";
import {teamByProjects} from "@components/about-us/who-we-are/team-by-projects";
import {infrastructure} from "@components/about-us/who-we-are/infrastructure";
import {monitoring} from "@components/about-us/who-we-are/monitoring";

const TeamByProject = ({dict}) => {
    return (
        <>
            <div className={`bg-default-opacity`}>
                <Avatars header={dict.geopark.aboutUs.whoWeAre.teamByProject.title}
                         teamName={dict.geopark.aboutUs.whoWeAre.teamByProject.investigation.title}
                         team={teamByProjects} whiteText={true}/>
            </div>
            <div className={`bg-white mx-auto`}>
                <Avatars teamName={dict.geopark.aboutUs.whoWeAre.teamByProject.infrastructure.title}
                         team={infrastructure}/>
            </div>
            <div className={`bg-default-opacity`}>
                <Avatars teamName={dict.geopark.aboutUs.whoWeAre.teamByProject.monitoring.title} team={monitoring}
                         whiteText={true}/>
            </div>
        </>

    );
};

export default TeamByProject;
