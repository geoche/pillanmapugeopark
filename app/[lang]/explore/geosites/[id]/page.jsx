import {getDictionary} from "@app/[lang]/dictionaries";

const GeositeDetails = async ({params}) => {
    const {lang, id} = params;
    const dict = await getDictionary(lang);
    return (
        <div>
            
        </div>
    );
};

export default GeositeDetails;
