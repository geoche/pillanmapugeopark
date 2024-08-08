import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import Footer from "@components/Footer";

import {whatWeDoList} from "@components/about-us/what-we-do/whatWeDoList";
import TextWithImageAligned from "@components/TextWithImageAligned";

const WhatWeDo = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg bg-[#6a9a8d] bg-opacity-70"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}/>
            {whatWeDoList.map((item, index) => (
                <div key={`wrapper-${index}`} className={index % 2 === 0 ? `bg-default` : `bg-default-opacity py-12`}>
                    <TextWithImageAligned
                        key={`TWIA-${index}`}
                        imageSrc={item.imageSource}
                        contentAlignedRight={index % 2 === 0}
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
