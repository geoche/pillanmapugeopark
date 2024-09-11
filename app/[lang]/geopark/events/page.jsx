"use client"

import EventsCalendar from "@components/events/EventsCalendar";
import HeaderOpacity from "@components/HeaderOpacity";

const Events = () => {
    return (
        <section className={`component-section`}>
            <HeaderOpacity title={`Events Calendar`}/>
            <EventsCalendar/>
        </section>);
};

export default Events;
