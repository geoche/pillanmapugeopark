import React from 'react';
import ReusableButton from "@components/ReusableButton";
import Carousel from "@components/Carousel";

const AssosiatedInstitutions = () => {
    return (
        <>
            <div className="text-center p-12  lg:px-32 xl:px-96">
                <h2 className="text-3xl font-bold mb-4">Associated Institutions</h2>
                <div className="pt-4">
                    <p>
                        The Pillanmapu Geopark Foundation seeks to establish a governance model that integrates all
                        relevant
                        actors in the management of the Maule Andes.
                    </p>
                    <p className={`pt-4`}>
                        The public sector and academia are key parts of this system of gears that must be articulated to
                        achieve the sustainable development expected of a UNESCO Global Geopark.
                    </p>
                </div>

            </div>
            <Carousel/>
            <div className="flex justify-center py-4">
                <ReusableButton buttonText={"Know more"} refLink={"/associates"}/> {/*Your button usage here*/}
            </div>
        </>
    );
};

export default AssosiatedInstitutions;
