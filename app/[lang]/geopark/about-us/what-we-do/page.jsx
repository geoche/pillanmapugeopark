import TextWithImageAligned from "@components/TextWithImageAligned";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import {whatWeDoList} from "@components/about-us/what-we-do/whatWeDoList";
import {getValueByKey} from "@utils/utils";

function updateNestedTranslations(linksArray, json) {
    return linksArray.map(link => {
        const updatedLink = { ...link };
        Object.keys(updatedLink).forEach(key => {
            updatedLink[key] = getValueByKey(json, updatedLink[key]) || updatedLink[key];
        });

        if (link.children) {
            updatedLink.children = updateNestedTranslations(link.children, json);
        }

        return updatedLink;
    });
}
const WhatWeDo = async ({params}) => {
    const dict = await getDictionary(params.lang);

    const updatedWhatWeDoList = updateNestedTranslations(whatWeDoList, dict);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.aboutUs.whatWeDo.header}/>
            {updatedWhatWeDoList.map((item, index) => (
                <div key={`wrapper-${index}`} className={index % 2 === 0 ? `bg-default` : `bg-default-opacity py-12`}>
                    <TextWithImageAligned
                        key={`TWIA-${index}`}
                        imageSrc={item.imageSource}
                        contentAlignedRight={index % 2 === 0}
                        whiteText={index % 2 !== 0}
                        headerText={item.title}
                        sectionText={item.text}
                        index={index}
                    />
                </div>
            ))}
        </section>
    );
};

export default WhatWeDo;
