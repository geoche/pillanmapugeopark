import Link from "next/link";
import Image from "next/image"


const Avatars = ({header, teamName, team = [], whiteText}) => {
    return (
        <div className={`w-full lg:w-1/2 md:mx-auto py-12 ${whiteText ? "text-white": ""}`}>
            {header ? (
                <h1 className="text-center text-3xl">{header}</h1>
            ) : null}
            {teamName ? (
                <h2 className="text-center text-xl py-4">{teamName}</h2>
            ) : null}
            <div className="flex flex-wrap justify-center">
                {team.map((item, index) => (
                    <div key={index} className="w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 p-4">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="min-h-0 md:min-h-24 ">
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <div>
                                    {item.position.map((position, index) => (
                                        <p key={index} className="text-center">{position}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-grow-0">
                                <Image
                                    src={item.imageSource}
                                    width={300}
                                    height={500}
                                    alt="image"
                                    className="w-auto h-full object-contain p-2 grayscale rounded-full"
                                />
                            </div>
                            <div className="flex-grow">
                                {item.description.map((description, index) => (
                                    <p key={index} className="text-center text-sm">{description}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Avatars;
