import {replaceConfigStrings} from "@utils/utils";

const missionVisionValues = [
    {
        title: "geopark.aboutUs.whatWeAre.territoryMission.mission.title",
        text: "geopark.aboutUs.whatWeAre.territoryMission.mission.text"
    },
    {
        title: "geopark.aboutUs.whatWeAre.territoryMission.vision.title",
        text: "geopark.aboutUs.whatWeAre.territoryMission.vision.text"
    },
    {
        title: "geopark.aboutUs.whatWeAre.territoryMission.values.title",
        text: "geopark.aboutUs.whatWeAre.territoryMission.values.text"
    }
];

const TerritoryMission = ({dict}) => {
    const updatedMissionVisionValues = replaceConfigStrings(missionVisionValues, dict);
    return (
        <div className={`flex items-center justify-center mx-auto bg-default-opacity py-12`}>
            <div className="text-center text-white w-screen  max-w-7xl">
                <div className="flex flex-wrap">
                    {updatedMissionVisionValues.map((item, index) => (
                        <div key={index} className="w-full md:w-1/3 p-4">
                            <div className="py-4 px-8">
                                <p className="font-bold text-2xl pb-4">{item.title}</p>
                                {item.title.toLowerCase() === "values" ? (
                                    <div className={`flex flex-col justify-center items-center text-xl`}>
                                        <ul className="list-none lg:pl-4">
                                            {item.text.split(' ').map((word, i) => (
                                                <li key={i} className="flex items-center">
                                                    <span className="mr-2">►</span>
                                                    <span>{word}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className={` text-xl`}>{item.text}</p>
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
