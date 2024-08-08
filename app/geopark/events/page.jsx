"use client"

import EventsCalendar from "@components/events/EventsCalendar";


const Events = () => {
    return (
        <section
            className="relative flex-col bg-cover bg-fixed bg-center bg-no-repeat"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <EventsCalendar/>
        </section>);
};

export default Events;
