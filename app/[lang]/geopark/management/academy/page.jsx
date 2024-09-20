import Academy from "@components/management/academy/Academy";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const ManagementAcademy = async ({params}) => {
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Academy`}/>
            <div className={`bg-default`}>
                <Academy dict={dict}/>
            </div>
        </section>
    );
};

export default ManagementAcademy;
