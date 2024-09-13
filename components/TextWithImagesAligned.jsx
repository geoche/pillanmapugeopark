import Image from "next/image";
import ReusableButton from "@components/ReusableButton";
import Link from "next/link";

const TextWithImagesAligned = ({
                                   headerText, sectionText, imageSources = [], buttonText, refLink, contentAlignedRight
                               }) => {
    const flexDirection = contentAlignedRight ? 'md:flex-row' : 'md:flex-row-reverse';
    const padding = contentAlignedRight ? 'md:pr-10' : 'md:pl-10';

    return (
        <div
            className={`relative flex flex-col items-center max-w-screen-xl px-4 py-12 mx-auto ${flexDirection} sm:px-6`}>
            <div className={`flex items-center md:w-1/2 md:pb-20 md:pt-10 ${padding}`}>
                <div className="text-justify ">
                    {headerText &&
                        <h2 className={`text-h-secondary ${contentAlignedRight ? "md:text-end" : "md:text-start"} py-4`}>{headerText}</h2>}
                    {Object.keys(sectionText).map((key, index) => (
                        <div className={`align-bottom`} key={index}>
                            <p className="pt-4">{sectionText[key]}</p>
                        </div>
                    ))}
                    {buttonText ? (<div className="flex flex-center py-4">
                        <ReusableButton buttonText={buttonText} refLink={refLink}/>
                    </div>) : null}
                </div>
            </div>
            <div className="flex items-center md:w-1/2 flex-wrap py-12">
                {imageSources.map((item, index) => (
                    <div
                        className={`flex flex-center ${imageSources.length > 3 ? (index === imageSources.length - 1 ? "w-full" : "w-1/2") : ""}`}
                        key={`div-${index}`}>
                        {item.link ? (
                            <Link href={item.link}
                                  passHref legacyBehavior>
                                <a target="_blank">
                                    <Image
                                        src={item.imageSource}
                                        width={500}
                                        height={300}
                                        alt="image"
                                        className={`${imageSources.length > 3 ? "max-h-32 w-auto" : ""}`}
                                    />
                                </a>
                            </Link>) : (<Image
                            src={item.imageSource}
                            width={500}
                            height={300}
                            alt="image"
                            className={`${imageSources.length > 3 ? "max-h-32 w-auto" : ""}`}
                        />)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextWithImagesAligned;
