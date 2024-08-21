"use client"
import { useState } from 'react';

const GuidesAndToursForm = () => {
    const [mainImgSrc, setMainImgSrc] = useState(null);
    const [imagesSrc, setImagesSrc] = useState([]);
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [types, setTypes] = useState('');  // Change to a single string to hold the comma-separated values
    const [contact, setContact] = useState({
        address: '',
        phone: '',
        email: '',
        link: '',
    });
    const [location, setLocation] = useState({
        type: 'Point',
        coordinates: [0, 0],
    });
    const [message, setMessage] = useState('');

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setMainImgSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setMainImgSrc(null);
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(setImagesSrc);
    };

    const handleContactChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleLocationChange = (e, index) => {
        const newCoordinates = [...location.coordinates];
        newCoordinates[index] = parseFloat(e.target.value);
        setLocation({ ...location, coordinates: newCoordinates });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Split the types by comma and trim spaces
        const typesArray = types.split(',').map(type => type.trim());

        const accommodationData = {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            type: typesArray,  // Submit the array of types
            contact,
            location,
        };

        console.log('Submitting:', accommodationData);

        try {
            const res = await fetch('/api/guides-and-tours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accommodationData),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (res.ok) {
                setMessage('Data saved successfully');
                // Reset form fields
                setMainImgSrc(null);
                setImagesSrc([]);
                setCity('');
                setTitle('');
                setDescription('');
                setTypes('');  // Reset types
                setContact({
                    address: '',
                    phone: '',
                    email: '',
                    link: '',
                });
                setLocation({
                    type: 'Point',
                    coordinates: [0, 0],
                });
            } else {
                setMessage('Failed to save data');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="mainImgSrc" className="block text-gray-700 font-bold mb-2">Main Image:</label>
                <input
                    type="file"
                    id="mainImgSrc"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="imagesSrc" className="block text-gray-700 font-bold mb-2">Other Images:</label>
                <input
                    type="file"
                    id="imagesSrc"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="types" className="block text-gray-700 font-bold mb-2">Type(s):</label>
                <input
                    type="text"
                    id="types"
                    value={types}
                    onChange={(e) => setTypes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter types separated by commas"
                    required
                />
                <p className="text-sm text-gray-500 mt-2">Each type should be separated by a comma.</p>
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={contact.address}
                    onChange={handleContactChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={contact.phone}
                    onChange={handleContactChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={contact.email}
                    onChange={handleContactChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="link" className="block text-gray-700 font-bold mb-2">Link:</label>
                <input
                    type="url"
                    id="link"
                    name="link"
                    value={contact.link}
                    onChange={handleContactChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location (Coordinates):</label>
                <div className="flex space-x-2">
                    <input
                        type="number"
                        value={location.coordinates[0]}
                        onChange={(e) => handleLocationChange(e, 0)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Longitude"
                        required
                    />
                    <input
                        type="number"
                        value={location.coordinates[1]}
                        onChange={(e) => handleLocationChange(e, 1)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Latitude"
                        required
                    />
                </div>
            </div>
            <button type="submit" className={`bg-button text-white px-4 py-2 rounded hover:bg-button-hover`}>
                Submit
            </button>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default GuidesAndToursForm;
