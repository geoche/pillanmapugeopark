"use client"

import Footer from "@components/Footer";
import Navbar from "@components/navbar/Navbar";
import RoundedSeparator from "@components/RoundedSeparator";
import EventsCalendar from "@components/events/EventsCalendar";


const Events = () => {
    return (
        <section
            className="relative h-screen w-screen overflow-x-hidden flex-col overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg z-40"
            style={{backgroundImage: `url(/assets/images/banner.jpg)`}}>
            <Navbar/>
            <div className={`mx-auto bg-default-opacity w-full h-80`}/>
            <RoundedSeparator top={true}/>
            <EventsCalendar/>
            <RoundedSeparator top={false}/>
            <Footer classNameExternal={"relative w-full"}/>
        </section>);
};

export default Events;
