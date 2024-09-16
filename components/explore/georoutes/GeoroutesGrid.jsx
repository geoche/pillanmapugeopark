import React from 'react';
import {georoutes} from "@components/explore/georoutes/georoutes";
import GeoroutesGridItem from "@components/explore/georoutes/GeoroutesGridItem";
import {replaceConfigStrings} from "@utils/utils";

const GeoroutesGrid = ({lang, dict}) => {
    const updatedGeoroutes = replaceConfigStrings(georoutes, dict);
    return (
        <div className="mx-auto p-4 bg-default w-full">
            <div className={`max-w-7xl flex flex-col flex-center mx-auto py-4`}>
                <div
                    className={`w-full flex flex-wrap flex-center items-center max-w-7xl mx-auto`}>
                    {updatedGeoroutes.map((item, index) => (
                        <GeoroutesGridItem key={index} item={item} lang={lang}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeoroutesGrid;
