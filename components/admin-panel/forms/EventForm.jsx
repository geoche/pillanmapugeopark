import {useState, useRef, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import Spinner from "@components/Spinner";
import 'react-datepicker/dist/react-datepicker.css';
import {Gallery, Item} from 'react-photoswipe-gallery';
import Image from 'next/image';
import 'photoswipe/dist/photoswipe.css';

const EventForm = () => {
    const [eventShortDesc, setEventShortDesc] = useState('');
    const [eventFullDesc, setEventFullDesc] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventImgSrc, setEventImgSrc] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [events, setEvents] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEventImgSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setEventImgSrc(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventShortDesc,
                    eventFullDesc,
                    eventImgSrc,
                    eventDate,
                }),
            });

            if (res.ok) {
                setMessage('Event saved successfully');
                setEventShortDesc('');
                setEventFullDesc('');
                setEventDate(new Date());
                setEventImgSrc(null);
                fileInputRef.current.value = '';
            } else {
                setMessage('Failed to save event');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setSubmitLoading(false);
            await fetchEvents();
        }
    };
    
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


    useEffect(() => {
        fetchEvents().then(() => {
        });
    }, []);


    return (
        <section className={`component-section`}>
            <div className={`admin-panel-module`}>
                {loading ? (
                    <div className={`form-loading`}>
                        <Spinner/>
                    </div>
                ) : (
                    <div className={`form-container`}>
                        <form onSubmit={handleSubmit}
                              className={`form-main transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>

                            <div className="mb-4">
                                <label htmlFor="shortDesc" className="block text-gray-700 font-bold mb-2">Short
                                    Description:</label>
                                <textarea
                                    id="shortDesc"
                                    value={eventShortDesc}
                                    onChange={(e) => setEventShortDesc(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    rows="2"
                                    required
                                    disabled={submitLoading}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fullDesc" className="block text-gray-700 font-bold mb-2">Full
                                    Description:</label>
                                <textarea
                                    id="fullDesc"
                                    value={eventFullDesc}
                                    onChange={(e) => setEventFullDesc(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    rows="4"
                                    required
                                    disabled={submitLoading}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Event Date:</label>
                                <DatePicker
                                    selected={eventDate}
                                    onChange={(date) => setEventDate(date)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                    disabled={submitLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                    disabled={submitLoading}
                                />
                            </div>
                            {submitLoading ?
                                <div className={`w-full flex flex-center`}>
                                    <Spinner/>
                                </div> : (
                                    <button
                                        type="submit"
                                        className={`bg-button text-white px-4 py-2 rounded hover:bg-button-hover`}
                                        disabled={submitLoading}
                                    >
                                        Submit
                                    </button>)}

                            {!submitLoading && message && <p className="mt-4 text-center text-green-500">{message}</p>}
                        </form>
                        <div className={`form-content-container`}>
                            <div
                                className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                <div className={`form-content-image-gallery-container`}>
                                    <Gallery withCaption>
                                        <div className={`form-content-image-gallery-content`}>
                                            {events.map((event, index) => (
                                                <Item
                                                    key={index}
                                                    original={event.eventImgSrc}
                                                    thumbnail={event.eventImgSrc}
                                                    width={1080}
                                                    height={720}
                                                    alt={`image`}
                                                    caption={`<div class="flex flex-col flex-center mx-auto" ><h1 class="max-w-7xl  text-sm text-justify pb-10">${event.eventFullDesc}</h1></div>`}
                                                >
                                                    {({ref, open}) => (
                                                        <div ref={ref} onClick={open}>
                                                            <Image
                                                                src={event.eventImgSrc}
                                                                alt={`image`}
                                                                width={250}
                                                                height={200}
                                                                className={`m-2 aspect-video object-cover`}
                                                            />
                                                            <div className={`p-2 text-xs `}>
                                                                <p className={`text-justify`}>{event.eventShortDesc}</p>
                                                                <div className={`flex flex-row space-x-2`}>
                                                                    <p>{new Date(event.eventDate).getDate()}</p>
                                                                    <p>{new Date(event.eventDate).toLocaleString('default', {month: 'long'})}</p>
                                                                    <p>{new Date(event.eventDate).toLocaleString('default', {weekday: 'long'})}</p>
                                                                    <p>{new Date(event.eventDate).getFullYear()}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Item>
                                            ))}
                                        </div>
                                    </Gallery>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventForm;
