import Image from "next/image";

import pilMapLogo from "@/public/assets/images/logo.png";

const BackgroundVideoMuted = () => {
    return (
        <div className={`relative w-full h-auto -mt-[9%]`}>
            <div
                className={`absolute flex flex-center flex-col items-center text-white text-sm md:text-lg left-0 right-0 top-0 bottom-0 justify-center`}>
                <p>GEOPARK</p>
                <Image src={pilMapLogo} alt="pilMapLogo" className="py-4 max-w-[50%]"/>
                <p>MANAGING HERITAGE – SUSTAINING TERRITORIES</p>
            </div>
            <video src={require("../../public/bgvideo.mp4")} autoPlay muted loop className={`w-full h-full`}/>
        </div>
    );
};

export default BackgroundVideoMuted;
