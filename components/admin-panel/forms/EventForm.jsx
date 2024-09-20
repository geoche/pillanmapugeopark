import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Spinner from "@components/Spinner";
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";
import { Gallery, Item } from 'react-photoswipe-gallery';
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

    // State variables for edit mode
    const [isEditMode, setIsEditMode] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    // New state to track if the image has been changed during edit
    const [imageChanged, setImageChanged] = useState(false);

    // State variable for delete confirmation
    const [eventToDelete, setEventToDelete] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEventImgSrc(reader.result);
            setImageChanged(true); // Mark that the image has been changed
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setEventImgSrc(null);
            setImageChanged(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const method = isEditMode ? 'PATCH' : 'POST';
            const apiUrl = '/api/events';

            const body = isEditMode
                ? {
                    id: editEventId,
                    eventShortDesc,
                    eventFullDesc,
                    eventDate,
                    imageChanged, // Indicate if the image has been changed
                    eventImgSrc: imageChanged ? eventImgSrc : null, // Include new image if changed
                }
                : { eventShortDesc, eventFullDesc, eventImgSrc, eventDate };

            const res = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setMessage(isEditMode ? 'Event updated successfully' : 'Event saved successfully');
                setEventShortDesc('');
                setEventFullDesc('');
                setEventDate(new Date());
                setEventImgSrc(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setIsEditMode(false);
                setEditEventId(null);
                setImageChanged(false);
            } else {
                setMessage('Failed to save event');
            }
        } catch (error) {
            console.error(error);
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
        fetchEvents();
    }, []);

    // Handle edit functionality
    const handleEdit = (event) => {
        setEventShortDesc(event.eventShortDesc);
        setEventFullDesc(event.eventFullDesc);
        setEventDate(new Date(event.eventDate));
        setEventImgSrc(event.eventImgSrc);
        setEditEventId(event._id);
        setIsEditMode(true);
        setImageChanged(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEventShortDesc('');
        setEventFullDesc('');
        setEventDate(new Date());
        setEventImgSrc(null);
        setImageChanged(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsEditMode(false);
        setEditEventId(null);
    };

    // Handle delete functionality
    const handleDelete = (event) => {
        setEventToDelete(event);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch('/api/events', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: eventToDelete._id }),
            });

            if (res.ok) {
                setMessage('Event deleted successfully');
                await fetchEvents();
            } else {
                setMessage('Failed to delete event');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setEventToDelete(null);
        }
    };

    const cancelDelete = () => {
        setEventToDelete(null);
    };

    return (
        <section className={`component-section`}>
            <div className={`admin-panel-module`}>
                {loading ? (
                    <div className={`form-loading`}>
                        <Spinner />
                    </div>
                ) : (
                    <div className={`form-container`}>
                        <form
                            onSubmit={handleSubmit}
                            className={`form-main transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="mb-4">
                                <label htmlFor="shortDesc" className="block text-gray-700 font-bold mb-2">
                                    Short Description:
                                </label>
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
                                <label htmlFor="fullDesc" className="block text-gray-700 font-bold mb-2">
                                    Full Description:
                                </label>
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
                                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                                    Event Date:
                                </label>
                                <DatePicker
                                    selected={eventDate}
                                    onChange={(date) => setEventDate(date)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                    disabled={submitLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                                    Image:
                                </label>
                                {eventImgSrc && (
                                    <img src={eventImgSrc} alt="Event Image" className="w-full h-auto rounded mb-2" />
                                )}
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required={!isEditMode}
                                    disabled={submitLoading}
                                />
                            </div>
                            {submitLoading ? (
                                <div className={`submit-loading`}>
                                    <Spinner />
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        className={`bg-button text-white px-4 py-2 rounded hover:bg-button-hover cursor-pointer`}
                                        disabled={submitLoading}
                                    >
                                        {isEditMode ? 'Edit' : 'Submit'}
                                    </button>
                                    {isEditMode && (
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="ml-2 cursor-pointer"
                                        >
                                            <FaUndo size={24} style={{ color: '#6a9a8d' }} />
                                        </button>
                                    )}
                                </div>
                            )}
                            {!submitLoading && message && (
                                <p className="mt-4 text-center text-green-500">{message}</p>
                            )}
                        </form>
                        <div className={`form-content-container`}>
                            <div
                                className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className={`form-content-image-gallery-container`}>
                                    <Gallery withCaption>
                                        <div className={`form-content-image-gallery-content`}>
                                            {events.map((event, index) => (
                                                <div key={index} className="relative m-2">
                                                    <div className={`edit-delete-buttons edit-delete-buttons-right rounded`}>
                                                        <FaEdit
                                                            size={24}
                                                            onClick={() => handleEdit(event)}
                                                            className={`cursor-pointer ${
                                                                isEditMode && editEventId === event._id
                                                                    ? 'text-green-500'
                                                                    : 'hover:text-green-500'
                                                            }`}
                                                        />
                                                        <FaTrashAlt
                                                            size={24}
                                                            onClick={() => handleDelete(event)}
                                                            className="cursor-pointer hover:text-red-500"
                                                        />
                                                    </div>
                                                    {/* Red veil overlay when event is being considered for deletion */}
                                                    {eventToDelete && eventToDelete._id === event._id && (
                                                        <div
                                                            className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50 rounded pointer-events-none"
                                                            style={{ zIndex: 10 }}
                                                        ></div>
                                                    )}
                                                    <Item
                                                        original={event.eventImgSrc}
                                                        thumbnail={event.eventImgSrc}
                                                        width={1080}
                                                        height={720}
                                                        alt={`Event Image`}
                                                        caption={`<div class="flex flex-col flex-center mx-auto" ><h1 class="max-w-7xl  text-sm text-justify pb-10">${event.eventFullDesc}</h1></div>`}
                                                    >
                                                        {({ ref, open }) => (
                                                            <div ref={ref} onClick={open}>
                                                                <Image
                                                                    src={event.eventImgSrc}
                                                                    alt={`Event Image`}
                                                                    width={250}
                                                                    height={200}
                                                                    className={`aspect-video object-cover w-full rounded`}
                                                                />
                                                                <div className={`p-2 text-xs`}>
                                                                    <p className={`text-justify`}>{event.eventShortDesc}</p>
                                                                    <div className={`flex flex-row space-x-2`}>
                                                                        <p>{new Date(event.eventDate).getDate()}</p>
                                                                        <p>
                                                                            {new Date(event.eventDate).toLocaleString('default', {
                                                                                month: 'long',
                                                                            })}
                                                                        </p>
                                                                        <p>
                                                                            {new Date(event.eventDate).toLocaleString('default', {
                                                                                weekday: 'long',
                                                                            })}
                                                                        </p>
                                                                        <p>{new Date(event.eventDate).getFullYear()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Item>
                                                </div>
                                            ))}
                                        </div>
                                    </Gallery>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Custom confirmation modal */}
            {eventToDelete && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-white p-6 rounded-lg">
                        <p className="mb-4 text-lg">Do you want to delete the selected event?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default EventForm;
