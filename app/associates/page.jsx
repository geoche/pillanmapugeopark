import ManagementAcademy from "@app/geopark/management/academy/page";
import ManagementPublicSector from "@app/geopark/management/public-sector/page";

const Associates = () => {
    return (<div>
        <section className={`component-section`}>
            <ManagementAcademy/>
            <ManagementPublicSector/>
        </section>
    </div>);
};

export default Associates;
