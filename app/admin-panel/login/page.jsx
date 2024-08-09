"use client"
import {signIn, signOut, useSession} from "next-auth/react";
import VideoForm from "@components/admin-panel/login/VideoForm";
import ImageForm from "@components/admin-panel/login/ImageForm";
import EventForm from "@components/admin-panel/login/EventForm";
import ReusableButton from "@components/ReusableButton";


const LoginPage = () => {
    const {data: session} = useSession();

    return (
        <section className={`component-section`}>
            {session && session.user ? (
                <div className={`w-full h-full flex flex-center items-center bg-default-opacity`}>
                    <div className={`w-full h-full py-20`}>
                        <ReusableButton onClickAction={() => signOut()} buttonText={`LOG OUT`}/>
                        <VideoForm/>
                        <div className={`py-4`}/>
                        <ImageForm/>
                        <div className={`py-4`}/>
                        <EventForm/>
                    </div>
                </div>
            ) : (
                <div className={`max-h-screen min-h-[92vh] flex flex-center items-center bg-default-opacity`}>
                    <ReusableButton onClickAction={() => signIn()} buttonText={`LOG IN`}/>
                </div>
            )}
        </section>
    );
};

export default LoginPage;

