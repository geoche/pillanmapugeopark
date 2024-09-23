"use client";

import {signIn, signOut, useSession} from "next-auth/react";
import {useState} from "react";
import { FaFileVideo, FaFileImage, FaCalendarCheck, FaHome, FaMapMarkedAlt, FaBlog, FaBinoculars, FaMountain  } from "react-icons/fa";

import ReusableButton from "@components/ReusableButton";

import VideoForm from "@components/admin-panel/forms/VideoForm";
import ImageForm from "@components/admin-panel/forms/ImageForm";
import EventForm from "@components/admin-panel/forms/EventForm";
import AccommodationForm from "@components/admin-panel/forms/AccommodationForm";
import GuidesAndToursForm from "@components/admin-panel/forms/GuidesAndToursForm";
import BlogForm from "@components/admin-panel/forms/BlogForm";
import ExperiencesForm from "@components/admin-panel/forms/ExperiencesForm";

import '@/styles/admin-panel.css'


const forms = [
    {name: "Video gallery", component: VideoForm, icon: FaFileVideo},
    {name: "Image gallery", component: ImageForm, icon: FaFileImage},
    {name: "Events calendar", component: EventForm, icon: FaCalendarCheck},
    {name: "Accommodations", component: AccommodationForm, icon: FaHome},
    {name: "Guides and tours", component: GuidesAndToursForm, icon: FaMapMarkedAlt},
    {name: "Experiences", component: ExperiencesForm, icon: FaMountain},
    {name: "Blogposts", component: BlogForm, icon: FaBlog},
];

const AdminPanelPage = () => {
    const {data: session} = useSession({required: true});
    const [selectedForm, setSelectedForm] = useState("Video gallery");

    return (
        <section className={`component-section`}>
            {session && session.user ? (
                <div
                    className={`w-full h-full flex justify-center items-center bg-default-opacity`}
                >
                    <div className={`w-full h-full`}>
                        {/* Buttons with icons */}
                        <div className={`flex flex-center`}>
                            <div className="flex flex-wrap justify-center">
                                {forms.map((form) => {
                                    const IconComponent = form.icon;
                                    return (
                                        <button
                                            key={form.name}
                                            onClick={() => setSelectedForm(form.name)}
                                            className="flex flex-col items-center m-2 p-2 border rounded hover:bg-header-green"
                                        >
                                            <IconComponent size={36} color={`white`} />
                                            <span className={`text-white pt-2`}>{form.name}</span>
                                        </button>
                                    );
                                })}
                                <div className={`flex flex-center border m-2 p-2 rounded hover:bg-header-green`}>
                                    <ReusableButton
                                        onClickAction={() => signOut()}
                                        buttonText={`LOG OUT`}
                                    />
                                </div>
                            </div>
                            
                        </div>
                        {/* Render selected form */}
                        {forms.map((form) => {
                            if (form.name === selectedForm) {
                                const FormComponent = form.component;
                                return <FormComponent key={form.name}/>;
                            }
                            return null;
                        })}
                    </div>
                </div>
            ) : (
                <div
                    className={`max-h-screen h-screen flex justify-center items-center bg-default-opacity`}
                >
                    <ReusableButton onClickAction={() => signIn()} buttonText={`LOG IN`}/>
                </div>
            )}
        </section>
    );
};

export default AdminPanelPage;
