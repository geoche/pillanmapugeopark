"use client"

import {useState, useEffect} from 'react';
import {IoIosArrowDown} from "react-icons/io";
import Image from "next/image";
import Spinner from "@components/Spinner";
import Separator from "@components/Separator";

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
                const sortedEvents = data.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
                setEvents(sortedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300); 
            }
        };

        fetchEvents().then(() => {});
    }, []);

    const toggleEvent = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <h2 className={`text-h-secondary`}>See our latest events</h2>
            <Separator/>
            <div className={`max-w-7xl flex flex-col flex-center mx-auto py-4`}>
                {loading ? (
                    <Spinner/>
                ) : (
                    events.map((event, index) => (
                        <div key={event._id}
                             className={`w-full p-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                            <button
                                onClick={() => toggleEvent(index)}
                                className="w-full flex flex-col sm:flex-wrap justify-between items-center sm:items-center text-left"
                            >
                                <div
                                    className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div id="DATE" className="w-full md:w-1/3 lg:w-[22%] xl:w-[30%] flex flex-row items-center px-4">
                                        <p className=" text-8xl min-w-[5rem] text-end">{new Date(event.eventDate).getDate()}</p>
                                        <div className="flex flex-col items-start  text-lg pl-4">
                                            <p>{new Date(event.eventDate).toLocaleString('default', {month: 'long'})}</p>
                                            <p>{new Date(event.eventDate).toLocaleString('default', {weekday: 'long'})}</p>
                                            <p>{new Date(event.eventDate).getFullYear()}</p>
                                        </div>
                                    </div>

                                    <div id="DESCRIPTION"
                                         className={`w-full md:w-1/3 xl:w-[50%] flex h-full text-justify transition-all duration-150 md:duration-300 px-4 md:px-0 ${openIndex === index ? 'text-lg md:text-2xl pt-4 md:pt-0' : ''}`}>
                                        {event.eventShortDesc}
                                    </div>

                                    <div id="IMAGE"
                                         className={`transition-all md:w-1/3 xl:w-[20%] duration-300 md:duration-300 ${openIndex === index ? 'max-w-0 max-h-0' : ''} px-4`}>
                                        <Image src={event.eventImgSrc} alt="event image" width={500} height={300} className="transition-all duration-300 my-4 md:my-0 w-full h-full" />

                                    </div>

                                    <div className="w-full sm:w-auto flex justify-center sm:block mt-4 sm:mt-0">
                                        <IoIosArrowDown
                                            className={`text-3xl transform transition-transform duration-300 md:duration-300 ${openIndex === index ? 'rotate-180' : ''}`}/>
                                    </div>
                                </div>
                            </button>
                            <div
                                className={`transition-all duration-300 md:duration-300 overflow-hidden ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                                <div
                                    className="flex flex-col md:flex-row justify-between p-0 md:p-4 items-center space-x-0 md:space-x-6">
                                    <div className="w-full md:w-1/2">
                                        <p className="text-justify">{event.eventFullDesc}</p>
                                    </div>
                                    <div className="w-full md:w-[70%]">
                                        <Image src={event.eventImgSrc} alt="event image" width={500} height={300}
                                               className="w-full h-full py-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EventsCalendar;
