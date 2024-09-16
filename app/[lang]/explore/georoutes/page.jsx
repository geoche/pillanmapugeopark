import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";
import GeoroutesGrid from "@components/explore/georoutes/GeoroutesGrid";
import Separator from "@components/Separator";

const Georoutes = async ({params}) => {
    const currentLang = params.lang;
    const dict = await getDictionary(params.lang);

    const sectionText = dict.exploreGeopark.georoutes.sectionText;

    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.exploreGeopark.georoutes.header}/>
            <div className={`bg-default p-4 py-12 flex flex-col flex-center`}>
                <div className={`max-w-7xl pb-4`}>
                    {Object.keys(sectionText).map((key, index) => (
                        <div key={`st-text-${index}`} className={`text-justify`}>
                            <p className={`py-2`}>{sectionText[key]}</p>
                        </div>
                    ))}
                </div>
                <Separator/>
                <div className={`max-w-7xl`}>
                    <GeoroutesGrid dict={dict} lang={currentLang}/>
                </div>
            </div>

        </section>
    );
};

export default Georoutes;
