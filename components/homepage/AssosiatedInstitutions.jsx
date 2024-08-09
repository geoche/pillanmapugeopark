import React from 'react';
import ReusableButton from "@components/ReusableButton";
import Carousel from "@components/Carousel";

const AssosiatedInstitutions = () => {
    return (
        <>
            <div className={`w-full max-w-7xl flex flex-center flex-col mx-auto py-12`}>
                <h2 className={`text-h-secondary`}>Associated Institutions</h2>
                <div className="space-y-2 text-center p-4">
                    <p>
                        The Pillanmapu Geopark Foundation seeks to establish a governance model that integrates all
                        relevant
                        actors in the management of the Maule Andes.
                    </p>
                    <p>
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
