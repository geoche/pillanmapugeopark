import PublicSector from "@components/management/public-sector/PublicSector";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const ManagementPublicSector = async ({params}) => {
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.geoparkManagement.publicSector.header}/>
            <div className={`bg-default`}>
                <PublicSector dict={dict} />
            </div>
        </section>
    );
};

export default ManagementPublicSector;
