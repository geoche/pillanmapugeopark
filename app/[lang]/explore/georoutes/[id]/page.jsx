import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import {georoutes} from "@components/explore/georoutes/georoutes";

const GeorouteDetails = async ({dict, params}) => {

    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Georoute ${params.id}`} />
        </section>
    );
};

export default GeorouteDetails;
