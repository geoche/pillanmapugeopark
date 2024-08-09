import Separator from "@components/Separator";
import AccommodationsItem from "@components/visit-us/accommodations/AccommodationsItem";
import {accommodationsMock} from "@components/visit-us/accommodations/accommodationsMock";

const AccommodationsGridWModal = () => {
    return (
        <div className="w-full bg-default">
            <div
                className="flex flex-wrap items-center flex-center max-w-screen-xl px-4 py-12 mx-auto sm:px-6 ">
                {accommodationsMock.map((item, index) => (
                    <AccommodationsItem index={index}
                                        item={item}
                                        key={`aci-${index}`}/>))}
            </div>
        </div>
    );
};

export default AccommodationsGridWModal;

