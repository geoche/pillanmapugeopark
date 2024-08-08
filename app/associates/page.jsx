import ManagementAcademy from "@app/geopark/management/academy/page";
import ManagementPublicSector from "@app/geopark/management/public-sector/page";

const Associates = () => {
    return (<div>
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <ManagementAcademy/>
            <ManagementPublicSector/>
        </section>
    </div>);
};

export default Associates;
