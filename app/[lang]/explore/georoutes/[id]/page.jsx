import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import {georoutes} from "@components/explore/georoutes/georoutes";
import {replaceConfigStrings} from "@utils/utils";
import Image from "next/image";
import GeorouteVideo from "@components/explore/georoutes/details/GeorouteVideo";

const GeorouteDetails = async ({params}) => {
    const {lang, id} = params;
    const dict = await getDictionary(lang);

    const georouteMap = replaceConfigStrings(georoutes, dict).reduce((map, georoute) => {
        map[georoute.id] = georoute;
        return map;
    }, {});

    const currentGeorouteRaw = georouteMap[id];

    if (!currentGeorouteRaw) {
        return (
            <section className="component-section">
                <HeaderOpacity title={`Georoute Not Found`}/>
                <p>The georoute with id "{id}" was not found.</p>
            </section>
        );
    }
    
    return (
        <section className="component-section">
            <HeaderOpacity title={currentGeorouteRaw.title}/>
            <div className={`w-full`}>
                <div className={`w-screen overflow-x-hidden flex flex-col flex-center bg-default p-4 py-12`}>
                    <div className={`max-w-7xl flex flex-col flex-center`}>
                        <Image
                            src={currentGeorouteRaw.mainImgSrc}
                            alt={`grt-img-${params.id}`}
                            className={`w-full max-w-4xl`}
                            width={1280}
                            height={720}/>
                        <div className={`text-justify`}>
                            {Object.values(currentGeorouteRaw.sectionText).map((paragraph, index) => (
                                <p className={`py-2`} key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <GeorouteVideo videoId={currentGeorouteRaw.videoId} place={currentGeorouteRaw.title} dict={dict}/>
            </div>
        </section>
    );
};

export default GeorouteDetails;
