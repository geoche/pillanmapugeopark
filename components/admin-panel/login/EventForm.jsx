import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = () => {
    const [eventShortDesc, setEventShortDesc] = useState('');
    const [eventFullDesc, setEventFullDesc] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventImgSrc, setEventImgSrc] = useState(null);
    const [message, setMessage] = useState('');

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

            const data = await res.json();

            if (res.ok) {
                setMessage('Event saved successfully');
                setEventShortDesc('');
                setEventFullDesc('');
                setEventDate(new Date());
                setEventImgSrc(null);
            } else {
                setMessage('Failed to save event');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="shortDesc" className="block text-gray-700 font-bold mb-2">Short Description:</label>
                <textarea
                    id="shortDesc"
                    value={eventShortDesc}
                    onChange={(e) => setEventShortDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="2"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="fullDesc" className="block text-gray-700 font-bold mb-2">Full Description:</label>
                <textarea
                    id="fullDesc"
                    value={eventFullDesc}
                    onChange={(e) => setEventFullDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Event Date:</label>
                <DatePicker
                    selected={eventDate}
                    onChange={(date) => setEventDate(date)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500">
                Submit
            </button>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default EventForm;
