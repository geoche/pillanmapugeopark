import {whatWeDoList} from "@components/about-us/what-we-do/whatWeDoList";
import TextWithImageAligned from "@components/TextWithImageAligned";
import HeaderOpacity from "@components/HeaderOpacity";

const WhatWeDo = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`What we do`}/>
            {whatWeDoList.map((item, index) => (
                <div key={`wrapper-${index}`} className={index % 2 === 0 ? `bg-default` : `bg-default-opacity py-12`}>
                    <TextWithImageAligned
                        key={`TWIA-${index}`}
                        imageSrc={item.imageSource}
                        contentAlignedRight={index % 2 === 0}
                        whiteText={index % 2 !== 0}
                        headerText={item.header}
                        displayText={item.text}
                        index={index}
                    />
                </div>
            ))}
        </section>
    );
};

export default WhatWeDo;
