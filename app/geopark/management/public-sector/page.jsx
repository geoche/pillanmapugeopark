import PublicSector from "@components/management/public-sector/PublicSector";
import HeaderOpacity from "@components/HeaderOpacity";

const ManagementPublicSector = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Public Sector`}/>
            <div className={`bg-default`}>
                <PublicSector/>
            </div>
        </section>
    );
};

export default ManagementPublicSector;
