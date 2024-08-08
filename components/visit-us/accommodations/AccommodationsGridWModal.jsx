import Separator from "@components/Separator";
import AccommodationsItem from "@components/visit-us/accommodations/AccommodationsItem";
import {accommodationsMock} from "@components/visit-us/accommodations/accommodationsMock";

const AccommodationsGridWModal = () => {
    return (<div className="w-full bg-default pb-24">
            <div className="text-center mx-4 py-8">
                <h1 className="text-3xl">ACCOMMODATIONS</h1>
            </div>
            <div
                className="flex flex-wrap items-center flex-center max-w-screen-xl px-4 py-12 mx-auto sm:px-6 ">
                {accommodationsMock.map((item, index) => (
                    <AccommodationsItem index={index}
                                        item={item}
                                        key={`aci-${index}`}/>))}
            </div>
        </div>);
};

export default AccommodationsGridWModal;

