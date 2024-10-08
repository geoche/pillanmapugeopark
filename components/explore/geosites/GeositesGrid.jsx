import {geosites} from "@components/explore/geosites/geosites";
import {replaceConfigStrings} from "@utils/utils";
import GeositesGridItem from "@components/explore/geosites/GeositesGridItem";

const GeositesGrid = ({lang, dict}) => {
    const updatedGeosites = replaceConfigStrings(geosites, dict)
    return (
        <div className="mx-auto bg-default w-full">
            <div className={`max-w-7xl flex flex-col flex-center mx-auto`}>
                <div className={`w-full flex flex-wrap flex-center items-center max-w-7xl mx-auto`}>
                    {updatedGeosites.map((item, index) => (
                        <GeositesGridItem key={index} item={item} lang={lang}/>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default GeositesGrid;
