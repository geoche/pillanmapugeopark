import Image from "next/image";

import pilMapLogo from "@/public/assets/images/logo.png";
const PageUnderConstruction = () => {
    return (
        <div className="h-screen -mt-[4%] bg-default-opacity flex flex-col items-center justify-center relative px-4 text-white text-center">
            <h1 className="text-5xl md:text-7xl mb-8 z-10">Coming Soon</h1>
            <p className="text-xl md:text-2xl">
                We're working hard to bring you something interesting. Stay tuned!
            </p>
            <Image src={pilMapLogo} alt="pilMapLogo" className="py-4 max-w-[50%]"/>
        </div>
    );
};

export default PageUnderConstruction;
