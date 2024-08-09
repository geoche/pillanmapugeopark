import React from 'react';
import Avatars from "@components/about-us/Avatars";
import {teamByProjects} from "@components/about-us/who-we-are/team-by-projects";
import {infrastructure} from "@components/about-us/who-we-are/infrastructure";
import {monitoring} from "@components/about-us/who-we-are/monitoring";
import Separator from "@components/Separator";

const TeamByProject = () => {
    return (
        <>
            <div className={`bg-default-opacity`}>
                <Avatars header={`TEAM BY PROJECT`.toUpperCase()} teamName={`INVESTIGATION`.toUpperCase()}
                         team={teamByProjects} whiteText={true}/>
            </div>
            <div className={`bg-white mx-auto`}>
                <Avatars teamName={`INFRASTRUCTURE`.toUpperCase()} team={infrastructure}/>
            </div>
            <div className={`bg-default-opacity`}>
                <Avatars teamName={`MONITORING`.toUpperCase()} team={monitoring} whiteText={true}/>
            </div>
        </>

    );
};

export default TeamByProject;
