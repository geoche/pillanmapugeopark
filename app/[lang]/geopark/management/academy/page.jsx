import Academy from "@components/management/academy/Academy";
import HeaderOpacity from "@components/HeaderOpacity";

const ManagementAcademy = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Academy`}/>
            <div className={`bg-default`}>
                <Academy/>
            </div>
        </section>
    );
};

export default ManagementAcademy;
