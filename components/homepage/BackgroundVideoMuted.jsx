﻿import Image from "next/image";

import pilMapLogo from "@/public/assets/images/logo.png";

const BackgroundVideoMuted = ({dict}) => {
    return (
        <div className={`relative w-full h-auto -mt-[8.5%]`}>
            <div
                className={`absolute flex flex-center flex-col items-center text-white text-sm md:text-lg left-0 right-0 top-0 bottom-0 justify-center`}>
                <p>{dict.home.bgVideo.title}</p>
                <Image src={pilMapLogo} alt="pilMapLogo" className="py-4 max-w-[50%]"/>
                <p className={`text-center`}>{dict.home.bgVideo.logoText}</p>
            </div>
            <video src={process.env.BG_VIDEO} autoPlay muted loop controls={false} className={`w-full h-full`}/>
        </div>
    );
};

export default BackgroundVideoMuted;
