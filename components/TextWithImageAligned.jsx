import Image from "next/image";
import ReusableButton from "@components/ReusableButton";

const TextWithImageAligned = ({headerText, displayText, imageSrc, buttonText, refLink, contentAlignedRight, index}) => {
    const flexDirection = contentAlignedRight ? 'md:flex-row' : 'md:flex-row-reverse';
    const padding = contentAlignedRight ? 'md:pr-10' : 'md:pl-10'

    return (
        <div
            className={`relative flex flex-col items-center max-w-screen-xl px-4 py-12 mx-auto ${flexDirection} sm:px-6`}
        key={index ? `TWIA-section-${index}` : `TWIA-section`}>
            <div className={`flex items-center md:w-1/2 md:pb-20 md:pt-10 ${padding}`}>
                <div className="text-justify text-white">
                    {headerText && <h2 className="text-xl font-bold mb-4">{headerText}</h2>}
                    {displayText.map((text, index) => (
                        <div key={`dp-text-${index}`} className={`align-bottom`}>
                            <p className="pt-4">
                                {text}
                            </p>
                        </div>
                    ))}
                    {buttonText ? (
                        <div className="flex justify-center py-4">
                            <ReusableButton buttonText={buttonText} refLink={refLink}/>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="flex items-center justify-center md:w-1/2 md:py-0 py-12 ">
                <div className="relative rounded">
                    <div className="rounded-lg bg-white bg-opacity-75 ">
                        <Image src={imageSrc}
                               width={500}
                               height={500}
                               sizes={`100vh`}
                               className="p-8 "
                               alt={"imgContent"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextWithImageAligned;
