import Image from "next/image";
import ReusableButton from "@components/ReusableButton";

const TextWithImageAligned = ({
                                  headerText,
                                  displayText,
                                  imageSrc,
                                  buttonText,
                                  refLink,
                                  contentAlignedRight,
                                  index,
                                  whiteText
                              }) => {
    const flexDirection = contentAlignedRight ? 'md:flex-row' : 'md:flex-row-reverse';
    const padding = contentAlignedRight ? 'md:pr-10' : 'md:pl-10'

    return (
        <div
            className={`relative flex flex-col items-center max-w-screen-xl py-12 mx-auto ${flexDirection} sm:px-6`}
            key={index ? `TWIA-section-${index}` : `TWIA-section`}>
            <div className={`flex items-center md:w-1/2 md:pb-20 md:pt-10 ${padding}`}>
                <div className={`text-justify mx-4 ${whiteText ? "text-white" : ""} `}>
                    {headerText &&
                        <h2 className={`text-h-secondary ${contentAlignedRight ? "md:text-end" : "md:text-start"} py-4`}>{headerText}</h2>}
                    {displayText.map((text, index) => (
                        <div key={`dp-text-${index}`} className={`align-bottom`}>
                            <p>{text}</p>
                        </div>
                    ))}
                    {buttonText ? (
                        <div className="flex justify-center py-4">
                            <ReusableButton buttonText={buttonText} refLink={refLink}/>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="flex items-center justify-center md:w-1/2 md:py-0">
                <div className="relative">
                    <div className="">
                        <Image src={imageSrc}
                               width={500}
                               height={500}
                               sizes={`100vh`}
                               alt={"imgContent"}
                               className={`p-4`}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextWithImageAligned;
