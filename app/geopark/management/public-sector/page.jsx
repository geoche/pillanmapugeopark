import PublicSector from "@components/management/public-sector/PublicSector";

const ManagementPublicSector = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-[#6a9a8d] bg-opacity-50 w-full h-80`}/>
            <div className={`bg-default`}>
                <h1 className={`text-white py-12 text-3xl text-center px-4`}>PUBLIC SECTOR</h1>
                <PublicSector/>
            </div>
        </section>
    );
};

export default ManagementPublicSector;
