"use client";

import {signOut, useSession} from "next-auth/react";
import {useState} from "react";
import ImageForm from "@components/admin-panel/login/ImageForm";
import EventForm from "@components/admin-panel/login/EventForm";
import ReusableButton from "@components/ReusableButton";
import AccommodationForm from "@components/admin-panel/login/AccommodationForm";
import GuidesAndToursForm from "@components/admin-panel/login/GuidesAndToursForm";
import BlogForm from "@components/admin-panel/login/BlogForm";
import ExperiencesForm from "@components/admin-panel/login/ExperiencesForm";
import VideoForm from "@components/admin-panel/forms/VideoForm";

const forms = [
    {name: "AdminVideoForm", component: VideoForm},
    {name: "AdminImageForm", component: ImageForm},
    {name: "AdminEventForm", component: EventForm},
    {name: "AdminAccommodationsForm", component: AccommodationForm},
    {name: "AdminGuidesAndToursForm", component: GuidesAndToursForm},
    {name: "AdminBlogForm", component: BlogForm},
    {name: "AdminExperiencesForm", component: ExperiencesForm},
];

const AdminPanelPage = () => {
    const {data: session} = useSession({required: true});
    const [selectedForm, setSelectedForm] = useState("AdminVideoForm");

    return (
        <section className={`component-section`}>
            {session && session.user ? (
                <div
                    className={`w-full h-full flex justify-center items-center bg-default-opacity`}
                >
                    <div className={`w-full h-full`}>
                        {/* Buttons with icons */}
                        <div className={`h-48 flex flex-center`}>
                            <div className="flex flex-wrap justify-center">
                                {forms.map((form) => (
                                    <button
                                        key={form.name}
                                        onClick={() => setSelectedForm(form.name)}
                                        className="flex flex-col items-center m-2 p-2 border rounded hover:bg-gray-100"
                                    >
                                        {/*ICON SHOULD BE HERE*/}
                                        <span>{form.name}</span>
                                    </button>
                                ))}
                                {/* LOG OUT button */}
                                <ReusableButton
                                    onClickAction={() => signOut()}
                                    buttonText={`LOG OUT`}
                                />
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
                    {/* You can add a message or redirect here */}
                </div>
            )}
        </section>
    );
};

export default AdminPanelPage;
