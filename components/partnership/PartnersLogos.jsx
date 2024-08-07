import {partnershipLogos} from "@components/partnership/partnershipLogos";
import Link from "next/link";
import Image from "next/image";

const PartnersLogos = () => {
    return (
        <div className={`flex flex-wrap bg-white rounded-xl 2xl:mx-auto 2xl:w-1/2 p-4 justify-center flex-center mx-4 my-12`}>
            {partnershipLogos.map((item, index) => (
                <div key={index} className={`w-full md:w-1/3 lg:w-1/4 p-2`}>
                    <Link href={item.link}
                          key={`link-${index}}`}
                          passHref legacyBehavior
                    >
                        <a target="_blank" className="block">
                            <div className={`flex flex-center`}>
                                <Image
                                    src={item.imageSource}
                                    width={300}
                                    height={500}
                                    alt="image"
                                    className={`w-auto h-full object-contain p-4`}
                                />
                            </div>
                            
                        </a>
                    </Link>
                </div>
            ))}
        </div>


    );
};

export default PartnersLogos;
