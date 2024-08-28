import ManagementAcademy from "@app/geopark/management/academy/page";
import ManagementPublicSector from "@app/geopark/management/public-sector/page";
import HeaderOpacity from "@components/HeaderOpacity";
import TextWithImagesAligned from "@components/TextWithImagesAligned";
import {geoparksLogos} from "@components/management/geoparks/geoparksLogos";
import {geoparksText} from "@components/management/geoparks/geoparksText";

const Associates = () => {
    return (
        <>
            <ManagementAcademy/>
            <ManagementPublicSector/>
            <section className={`component-section`}>
                <HeaderOpacity title={`Geoparks`}/>
                <div className={`bg-default`}>
                    <TextWithImagesAligned
                        imageSources={geoparksLogos}
                        contentAlignedRight={false}
                        displayText={geoparksText}
                        headerText={`Geoparks`}
                    />
                </div>
            </section>
        </>
    );
};

export default Associates;
