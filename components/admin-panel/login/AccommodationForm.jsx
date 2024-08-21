import {useState, useRef} from 'react';
import Spinner from "@components/Spinner";

const AccommodationForm = () => {
    const [mainImgSrc, setMainImgSrc] = useState(null);
    const [imagesSrc, setImagesSrc] = useState([]);
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [facilities, setFacilities] = useState('');
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
    const [loading, setLoading] = useState(false);

    const mainImgInputRef = useRef(null);
    const imagesInputRef = useRef(null);

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
        setContact({...contact, [e.target.name]: e.target.value});
    };

    const handleLocationChange = (e, index) => {
        const newCoordinates = [...location.coordinates];
        newCoordinates[index] = parseFloat(e.target.value);
        setLocation({...location, coordinates: newCoordinates});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const accommodationData = {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            facilities,
            contact,
            location,
        };

        console.log('Submitting:', accommodationData);

        try {
            const res = await fetch('/api/accommodations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accommodationData),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (res.ok) {
                setMessage('Accommodation saved successfully');
                // Reset form fields
                setMainImgSrc(null);
                setImagesSrc([]);
                setCity('');
                setTitle('');
                setDescription('');
                setFacilities('');
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
                mainImgInputRef.current.value = '';
                imagesInputRef.current.value = '';
            } else {
                setMessage('Failed to save accommodation');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setLoading(false);
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
                    ref={mainImgInputRef}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
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
                    ref={imagesInputRef}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="facilities" className="block text-gray-700 font-bold mb-2">Facilities:</label>
                <input
                    type="text"
                    id="facilities"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter facility types separated by commas"
                    required
                    disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-2">Each facility type should be separated by a comma.</p>
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
                    disabled={loading}
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
                    placeholder="Enter phone numbers separated by commas"
                    required
                    disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-2">Each number should be separated by a comma.</p>
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
                    disabled={loading}
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
                    disabled={loading}
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
                        disabled={loading}
                    />
                    <input
                        type="number"
                        value={location.coordinates[1]}
                        onChange={(e) => handleLocationChange(e, 1)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Latitude"
                        required
                        disabled={loading}
                    />
                </div>
            </div>
            {loading ?
                <div className={`w-full flex flex-center`}>
                    <Spinner/>
                </div> : (
                    <button
                        type="submit"
                        className={`bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500`}
                        disabled={loading}
                    >
                        Submit
                    </button>)}

            {!loading && message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default AccommodationForm;
