"use client"
import {useState, useEffect, useRef} from 'react';
import Spinner from "@components/Spinner";
import Image from "next/image";

const AccommodationForm = () => {
    const [mainImgSrc, setMainImgSrc] = useState(null);
    const [imagesSrc, setImagesSrc] = useState([]);
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [facilityType, setFacilityType] = useState('');
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
    const [activeSection, setActiveSection] = useState(null);

    const [accommodations, setAccommodations] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [cities, setCities] = useState([]);

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

        const facilitiesArray = facilityType.split(',').map(facility => facility.trim());

        const accommodationData = {
            mainImgSrc,
            imagesSrc,
            city,
            title,
            description,
            facilityType: facilitiesArray,
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
                setFacilityType('');
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

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await fetch('/api/accommodations');
                if (!res.ok) {
                    console.error('Failed to fetch accommodations');
                    return;
                }
                const data = await res.json();
                setAccommodations(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchAccommodations().then(() => {
        });
    }, []);


    return (
        <section className={`component-section`}>
            <div className={`form-container`}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={`flex flex-row justify-end w-[95%]`}>
                        <form onSubmit={handleSubmit}
                              className="w-[30%] p-4 my-4 bg-white rounded shadow-md fixed left-10 z-10">
                            {/* Images Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'images' ? null : 'images')}
                                >
                                    Images
                                </h2>
                                {activeSection === 'images' && (
                                    <div>
                                        {/* Main Image */}
                                        <div className="mb-4">
                                            <label htmlFor="mainImgSrc" className="block text-gray-700 font-bold mb-2">Main
                                                Image:</label>
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
                                        {/* Other Images */}
                                        <div className="mb-4">
                                            <label htmlFor="imagesSrc" className="block text-gray-700 font-bold mb-2">Other
                                                Images:</label>
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
                                    </div>
                                )}
                            </div>

                            {/* Description Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'description' ? null : 'description')}
                                >
                                    Description
                                </h2>
                                {activeSection === 'description' && (
                                    <div>
                                        {/* Title */}
                                        <div className="mb-4">
                                            <label htmlFor="title"
                                                   className="block text-gray-700 font-bold mb-2">Title:</label>
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
                                        {/* City */}
                                        <div className="mb-4">
                                            <label htmlFor="city"
                                                   className="block text-gray-700 font-bold mb-2">City:</label>
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
                                        {/* Description */}
                                        <div className="mb-4">
                                            <label htmlFor="description"
                                                   className="block text-gray-700 font-bold mb-2">Description:</label>
                                            <textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                rows="3"
                                                required
                                                disabled={loading}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Type Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'type' ? null : 'type')}
                                >
                                    Type
                                </h2>
                                {activeSection === 'type' && (
                                    <div>
                                        {/* Facilities */}
                                        <div className="mb-4">
                                            <label htmlFor="facilities"
                                                   className="block text-gray-700 font-bold mb-2">Facilities:</label>
                                            <input
                                                type="text"
                                                id="facilities"
                                                value={facilityType}
                                                onChange={(e) => setFacilityType(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter facility types separated by commas"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contacts Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'contacts' ? null : 'contacts')}
                                >
                                    Contacts
                                </h2>
                                {activeSection === 'contacts' && (
                                    <div>
                                        {/* Address */}
                                        <div className="mb-4">
                                            <label htmlFor="address"
                                                   className="block text-gray-700 font-bold mb-2">Address:</label>
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
                                        {/* Phone */}
                                        <div className="mb-4">
                                            <label htmlFor="phone"
                                                   className="block text-gray-700 font-bold mb-2">Phone:</label>
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
                                        </div>
                                        {/* Email */}
                                        <div className="mb-4">
                                            <label htmlFor="email"
                                                   className="block text-gray-700 font-bold mb-2">Email:</label>
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
                                        {/* Link */}
                                        <div className="mb-4">
                                            <label htmlFor="link"
                                                   className="block text-gray-700 font-bold mb-2">Link:</label>
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
                                    </div>
                                )}
                            </div>

                            {/* Location Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => setActiveSection(activeSection === 'location' ? null : 'location')}
                                >
                                    Location
                                </h2>
                                {activeSection === 'location' && (
                                    <div>
                                        {/* Location */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Location
                                                (Coordinates):</label>
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
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            {loading ? (
                                <div className="w-full flex justify-center">
                                    <Spinner/>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            )}

                            {!loading && message && (
                                <p className="mt-4 text-center text-green-500">{message}</p>
                            )}
                        </form>
                        <div className={`w-[65%] min-h-[44rem]`}>
                            <div
                                className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                <>
                                    <div
                                        className={`w-full flex flex-wrap flex-center items-center max-w-7xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                        {accommodations.map((item, index) => (
                                            <>
                                                <div key={index} className={`p-2 w-full sm:w-1/2 lg:w-1/3 relative`}>
                                                    <div>
                                                        <Image
                                                            src={item.mainImgSrc}
                                                            alt={`Accommodations ${index}`}
                                                            priority
                                                            width={800}
                                                            height={600}
                                                            className={`rounded-2xl aspect-video`}
                                                        />
                                                    </div>
                                                    <div
                                                        className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-tl-2xl rounded">
                                                        <p>{item.city}</p>
                                                    </div>
                                                    <div
                                                        className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                                                        <p>{item.title}</p>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AccommodationForm;
