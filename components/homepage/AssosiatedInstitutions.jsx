import Carousel from "@components/Carousel";
import ReusableButton from "@components/ReusableButton";

const AssosiatedInstitutions = ({lang, dict}) => {
    return (
        <>
            <div className={`w-full max-w-7xl flex flex-center flex-col mx-auto py-12`}>
                <h2 className={`text-h-secondary`}>Associated Institutions</h2>
                <div className="space-y-2 text-center p-4">
                    <p>{dict.home.associatedInstitutions.sectionText.par1}</p>
                    <p>{dict.home.associatedInstitutions.sectionText.par2}</p>
                </div>

            </div>
            <Carousel/>
            <div className="flex justify-center py-4">
                <ReusableButton buttonText={"Know more"} refLink={`${lang}/associates`}/>
            </div>
        </>
    );
};

export default AssosiatedInstitutions;
