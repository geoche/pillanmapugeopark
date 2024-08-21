﻿"use client"
import Image from "next/image";
import Link from "next/link";


const GuidesAndToursGridItem = ({item = {}, index}) => {
    return (
        <div key={index} className={`p-2 w-full sm:w-1/2 lg:w-1/3 relative`}>
            <Link className={`w-full`} href={`/visit-us/guides-and-tours/${item._id}`}>
                <div>
                    <Image
                        src={item.mainImgSrc}
                        alt={`Guides-and-tours-${index}`}
                        priority
                        width={800}
                        height={600}
                        className={`rounded-2xl aspect-video`}
                    />
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-tl-2xl rounded">
                    <p>{item.city}</p>
                </div>
                <div
                    className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                    <p>{item.title}</p>
                </div>
            </Link>
        </div>
    );
};

export default GuidesAndToursGridItem;