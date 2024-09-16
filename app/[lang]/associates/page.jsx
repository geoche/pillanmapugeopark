import ManagementAcademy from "@app/[lang]/geopark/management/academy/page";
import ManagementPublicSector from "@app/[lang]/geopark/management/public-sector/page";
import ManagementGeoparks from "@app/[lang]/geopark/management/geoparks/page";

const Associates = async ({params}) => {
    return (
        <>
            <ManagementAcademy params={params}/>
            <ManagementPublicSector params={params}/>
            <ManagementGeoparks params={params}/>
        </>
    );
};

export default Associates;
