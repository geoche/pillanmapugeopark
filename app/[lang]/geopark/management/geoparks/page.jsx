import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import Geoparks from "@components/management/geoparks/Geoparks";
const ManagementGeoparks =async ({params}) => {
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.geoparkManagement.geoparks.header}/>
            <Geoparks dict={dict} />
        </section>
    );
};

export default ManagementGeoparks;
