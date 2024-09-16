import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import {georoutes} from "@components/explore/georoutes/georoutes";
import {replaceConfigStrings} from "@utils/utils";
import Image from "@node_modules/next/image";
import GeorouteVideo from "@components/explore/georoutes/details/GeorouteVideo";

// Create a georoute map for O(1) lookup
const georouteMap = georoutes.reduce((map, georoute) => {
    map[georoute.id] = georoute;
    return map;
}, {});

function getGeorouteById(id) {
    return georouteMap[id];
}

const GeorouteDetails = async ({params}) => {
    const {lang, id} = params;
    const dict = await getDictionary(lang);

    const currentGeorouteRaw = getGeorouteById(id);

    if (!currentGeorouteRaw) {
        // Handle the case where the georoute is not found
        return (
            <section className="component-section">
                <HeaderOpacity title={`Georoute Not Found`}/>
                <p>The georoute with id "{id}" was not found.</p>
            </section>
        );
    }

    const georouteToShow = replaceConfigStrings(currentGeorouteRaw, dict);

    return (
        <section className="component-section">
            <HeaderOpacity title={georouteToShow.title}/>
            <div className={`w-full`}>
                <div className={`w-screen overflow-x-hidden flex flex-col flex-center bg-default p-4 py-12`}>
                    <div className={`max-w-7xl flex flex-col flex-center`}>
                        <Image
                            src={georouteToShow.mainImgSrc}
                            alt={`grt-img-${params.id}`}
                            className={`w-full`}
                            width={1280}
                            height={720}/>
                        <div className={`text-justify`}>
                            {Object.values(georouteToShow.sectionText).map((paragraph, index) => (
                                <p className={`py-2`} key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <GeorouteVideo videoId={georouteToShow.videoId} place={georouteToShow.title}/>
            </div>
        </section>
    );
};

export default GeorouteDetails;
