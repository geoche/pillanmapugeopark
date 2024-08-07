import Image from "next/image";
import ReusableButton from "@components/ReusableButton";
import Link from "next/link";

const TextWithImagesAligned = ({
                                   headerText, displayText, imageSources = [], buttonText, refLink, contentAlignedRight
                               }) => {
    const flexDirection = contentAlignedRight ? 'md:flex-row' : 'md:flex-row-reverse';
    const padding = contentAlignedRight ? 'md:pr-10' : 'md:pl-10';

    return (
        <div
            className={`relative flex flex-col items-center max-w-screen-xl px-4 py-12 mx-auto ${flexDirection} sm:px-6`}>
            <div className={`flex items-center md:w-1/2 md:pb-20 md:pt-10 ${padding}`}>
                <div className="text-justify text-white">
                    {headerText && <h2 className="text-xl font-bold mb-4 ">{headerText}</h2>}
                    {displayText.map((text, index) => (<div className={`align-bottom`} key={index}>
                        <p className="pt-4">
                            {text}
                        </p>
                    </div>))}
                    {buttonText ? (<div className="flex justify-center py-4">
                        <ReusableButton buttonText={buttonText} refLink={refLink}/>
                    </div>) : null}
                </div>
            </div>
            <div className="flex items-center md:w-1/2 flex-wrap py-12">
                <div className="relative bg-white rounded-2xl p-4">
                    {imageSources.map((item, index) => (
                        <div className={`flex flex-col flex-center justify-center`} key={`div-${index}`}>
                            <Link href={item.link}
                                  passHref legacyBehavior>
                                <a target="_blank">
                                    <Image
                                        src={item.imageSource}
                                        width={500}
                                        height={300}
                                        alt="image"
                                        sizes="100vw"
                                        className={`w-auto h-full min-w-[21.88rem]`}
                                    />
                                </a>
                            </Link>
                        </div>

                    ))}
                </div>


            </div>
        </div>
    );
};

export default TextWithImagesAligned;
