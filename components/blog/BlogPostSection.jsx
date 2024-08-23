import React from 'react';
import Image from "next/image";

const BlogPostSection = ({blogPostSection, index}) => {
    return (
        <div key={index} className={`max-w-7xl py-8`}>
            {blogPostSection.nodeImage.nodeImageSrc && (
                <>
                    <Image
                        src={blogPostSection.nodeImage.nodeImageSrc}
                        alt={`nodeImg-${index}`}
                        className="w-full max-w-4xl"
                        width={1280}
                        height={720}
                    />
                    <div className="w-full flex flex-col flex-center py-2 px-4">
                        <p className="text-black w-full max-w-4xl text-justify italic text-xs">
                            {blogPostSection.nodeImage.nodeImageDescription}
                        </p>
                        <p className="text-black w-full max-w-4xl italic text-xs">
                            {`Photography by ${blogPostSection.nodeImage.nodeImageBy}`}
                        </p>
                    </div>
                    {blogPostSection.text && (
                        <>
                            <div className="w-full flex flex-col flex-center px-0 xl:px-4 py-8">
                                <p className="text-black w-full max-w-2xl text-justify ">
                                    {blogPostSection.text}
                                </p>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>

    );
};

export default BlogPostSection;
