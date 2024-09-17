import pilMapLogo from "@/public/assets/images/logo.png";
import Image from "next/image";

const HeaderOpacity = ({title}) => {
    return (
        <div className={`flex flex-center mx-auto bg-default-opacity w-full min-h-44 md:min-h-60 p-4`}>
            {title ? (<h1 className={`text-h-main text-white`}>{title}</h1>) : (
                <Image src={pilMapLogo} alt="pilMapLogo" className="py-4 max-w-[50%]"/>
            )}
        </div>
    );
};

export default HeaderOpacity;
