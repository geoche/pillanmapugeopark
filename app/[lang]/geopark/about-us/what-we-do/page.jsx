import TextWithImageAligned from "@components/TextWithImageAligned";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import {whatWeDoList} from "@components/about-us/what-we-do/whatWeDoList";
import {replaceConfigStrings} from "@utils/utils";

const WhatWeDo = async ({params}) => {
    const dict = await getDictionary(params.lang);

    const updatedWhatWeDoList = replaceConfigStrings(whatWeDoList, dict);
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
