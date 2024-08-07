import React from 'react';
import Avatars from "@components/about-us/Avatars";
import {teamByProjects} from "@components/about-us/who-we-are/team-by-projects";
import {infrastructure} from "@components/about-us/who-we-are/infrastructure";
import {monitoring} from "@components/about-us/who-we-are/monitoring";
import Separator from "@components/Separator";

const TeamByProject = () => {
    return (
        <div className={`bg-white mx-auto`}>
            <Avatars header={`TEAM BY PROJECT`.toUpperCase()} teamName={`INVESTIGATION`.toUpperCase()}
                     team={teamByProjects}/>
            <Avatars teamName={`INFRASTRUCTURE`.toUpperCase()} team={infrastructure}/>
            <Avatars teamName={`MONITORING`.toUpperCase()} team={monitoring}/>
        </div>
    );
};

export default TeamByProject;
