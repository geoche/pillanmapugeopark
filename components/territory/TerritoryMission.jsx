const missionVisionValues =
    [
        {
            header: "mission",
            text: "Promote the sustainable development of the inhabitants of the Maule mountain range through conservation, geotourism and education."
        },
        {
            header: "vision",
            text: "Establish a territorial management and development model through the UNESCO Global Geopark figure in the Maule mountain range."
        },
        {
            header: "values",
            text: "Collaboration Commitment Solidarity Excellence"
        }

    ]

const TerritoryMission = () => {
    return (
        <div className={`flex items-center justify-center mx-auto bg-default-opacity py-12`}>
            <div className="text-center text-white w-screen  max-w-7xl">
                <div className="flex flex-wrap">
                    {missionVisionValues.map((text, index) => (
                        <div key={index} className="w-full md:w-1/3 p-4">
                            <div className="py-4 px-8">
                                <p className="font-bold text-2xl pb-4">{text.header}</p>
                                {text.header.toLowerCase() === "values" ? (
                                    <div className={`flex flex-col justify-center items-center  text-xl`}>
                                        <ul className="list-none lg:pl-4">
                                            {text.text.split(' ').map((word, i) => (
                                                <li key={i} className="flex items-center">
                                                    <span className="mr-2">►</span>
                                                    <span>{word}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                ) : (
                                    <p className={` text-xl`}>{text.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default TerritoryMission;
