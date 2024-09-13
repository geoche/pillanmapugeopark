import EventsCalendar from "@components/events/EventsCalendar";
import HeaderOpacity from "@components/HeaderOpacity";
import {getDictionary} from "@app/[lang]/dictionaries";

const Events = async ({params}) => {
    const currentLanguage = params.lang;
    const dict = await getDictionary(params.lang);
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={dict.geopark.events.header}/>
            <EventsCalendar lang={currentLanguage} dict={dict}/>
        </section>);
};

export default Events;
