"use client"

import {useState, useEffect} from 'react';
import {IoIosArrowDown} from "react-icons/io";
import Separator from "@components/Separator";
import Image from "next/image";
import Spinner from "@components/Spinner";

const EventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();
                // Sort events by date in descending order
                const sortedEvents = data.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 1); // Short delay to ensure smooth transition
            }
        };

        fetchEvents();
    }, []);

    const toggleEvent = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`mx-auto p-4 bg-default w-full pb-32 py-12 text-white`}>
            <h1 className="text-white pt-12 md:pt-0 text-3xl text-center px-4">EVENTS CALENDAR</h1>
            <h1 className="text-white pt-4 text-lg text-center">See our latest events</h1>
            <Separator/>
            <div className={`max-w-7xl flex flex-col justify-center items-center mx-auto py-4 `}>

                {loading ? (
                    <Spinner/>
                ) : (
                    events.map((event, index) => (
                        <div key={event._id}
                             className={`w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                            <button
                                onClick={() => toggleEvent(index)}
                                className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-center text-left"
                            >
                                <div
                                    className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div id="DATE" className="w-full md:w-[20%] flex flex-row items-center px-4">
                                        <p className="text-white text-8xl min-w-[5rem] text-end">{new Date(event.eventDate).getDate()}</p>
                                        <div className="flex flex-col items-start text-white text-lg pl-4">
                                            <p>{new Date(event.eventDate).toLocaleString('default', {month: 'long'})}</p>
                                            <p>{new Date(event.eventDate).toLocaleString('default', {weekday: 'long'})}</p>
                                            <p>{new Date(event.eventDate).getFullYear()}</p>
                                        </div>
                                    </div>

                                    <div id="DESCRIPTION"
                                         className={`w-full md:w-[50%] flex h-full text-justify transition-all duration-150 md:duration-500 px-4 md:px-0 ${openIndex === index ? 'text-lg md:text-2xl pt-4 md:pt-0' : ''}`}>
                                        {event.eventShortDesc}
                                    </div>

                                    <div id="IMAGE"
                                         className={`transition-all duration-300 md:duration-500 ${openIndex === index ? 'max-w-0 max-h-0' : 'lg:max-w-[13%] w-full h-full'} px-4`}>
                                        <Image src={event.eventImgSrc} alt="event image" width={0} height={0} className="rounded-2xl shadow-2xl transition-all duration-300 my-4 md:my-0 w-full h-full" />

                                    </div>

                                    <div className="w-full sm:w-auto flex justify-center sm:block mt-4 sm:mt-0">
                                        <IoIosArrowDown
                                            className={`text-3xl transform transition-transform duration-300 md:duration-500 ${openIndex === index ? 'rotate-180' : ''}`}/>
                                    </div>
                                </div>
                            </button>
                            <div
                                className={`mt-4 px-4 md:px-12 transition-all duration-300 md:duration-500 overflow-hidden ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                                <div
                                    className="flex flex-col md:flex-row justify-between p-0 md:p-4 items-center space-x-0 md:space-x-6">
                                    <div className="w-full md:w-1/2">
                                        <p className="text-justify">{event.eventFullDesc}</p>
                                    </div>
                                    <div className="w-full md:w-1/2 pl-0">
                                        <Image src={event.eventImgSrc} alt="event image" width={0} height={0}
                                               className="rounded-2xl my-4 md:my-0 w-full h-full"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Separator/>
        </div>
    );
};

export default EventsCalendar;
