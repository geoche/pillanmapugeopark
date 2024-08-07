"use client"
import {signIn, signOut, useSession} from "next-auth/react";
import Footer from "@components/Footer";
import VideoForm from "@components/admin-panel/login/VideoForm";
import ImageForm from "@components/admin-panel/login/ImageForm";
import EventForm from "@components/admin-panel/login/EventForm";


const LoginPage = () => {
    const {data: session} = useSession();

    return (
        <div
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg">
            {session && session.user ? (
                <div className={`w-full h-full flex flex-center items-center`}>
                    <button onClick={() => signOut()}
                            className={`px-8 py-4 bg-gradient-to-r from-teal-500 to-orange-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90`}>
                        LOG OUT
                    </button>
                    <div className={`w-full h-full py-20`}>
                        <VideoForm/>
                        <div className={`py-4`}/>
                        <ImageForm/>
                        <div className={`py-4`}/>
                        <EventForm/>
                    </div>
                </div>
            ) : (
                <div className={`w-full h-full flex flex-center items-center`}>
                    <button onClick={() => signIn()}
                            className={`px-8 py-4 bg-gradient-to-r from-teal-500 to-orange-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90`}>
                        LOG IN
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;

