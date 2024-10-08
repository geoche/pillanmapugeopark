import {getDictionary} from "@app/[lang]/dictionaries";
import {geosites} from "@components/explore/geosites/geosites";
import {replaceConfigStrings} from "@utils/utils";
import HeaderOpacity from "@components/HeaderOpacity";


const GeositeDetails = async ({params}) => {
    const {lang, id} = params;
    const dict = await getDictionary(lang);

    const geositeMap = replaceConfigStrings(geosites, dict).reduce((map, geosite) => {
        map[geosite.title] = geosite;
        return map;
    }, {});
    
    console.log(geositeMap[decodeURI(id)]);
    
    const currentGeositeRaw = geositeMap[decodeURI(id)];

    if (!currentGeositeRaw) {
        return (
            <section className="component-section">
                <HeaderOpacity title={`Georoute Not Found`}/>
                <p>The geosite with id "{id}" was not found.</p>
            </section>
        );
    }
    
    return (
        <section className="component-section">

        </section>
    );
};

export default GeositeDetails;
