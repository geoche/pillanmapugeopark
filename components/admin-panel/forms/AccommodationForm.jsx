"use client";
import React, { useState, useEffect, useRef } from 'react';
import Spinner from "@components/Spinner";
import Image from "next/image";
import { FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";

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
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Use an array to track active sections
    const [activeSections, setActiveSections] = useState([]);

    const [accommodations, setAccommodations] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const mainImgInputRef = useRef(null);
    const imagesInputRef = useRef(null);

    // State variables for edit mode
    const [isEditMode, setIsEditMode] = useState(false);
    const [editAccommodationId, setEditAccommodationId] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [imagesChanged, setImagesChanged] = useState(false);

    // State variable for delete confirmation
    const [accommodationToDelete, setAccommodationToDelete] = useState(null);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setMainImgSrc(reader.result);
            setImageChanged(true); // Mark that the main image has been changed
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setMainImgSrc(null);
            setImageChanged(false);
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

        Promise.all(promises).then((images) => {
            setImagesSrc(images);
            setImagesChanged(true); // Mark that the additional images have been changed
        });
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
        setSubmitLoading(true);

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
            imageChanged,
            imagesChanged,
            id: isEditMode ? editAccommodationId : undefined,
        };

        const method = isEditMode ? 'PATCH' : 'POST';

        try {
            const res = await fetch('/api/accommodations', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accommodationData),
            });

            if (res.ok) {
                setMessage(isEditMode ? 'Accommodation updated successfully' : 'Accommodation saved successfully');
                // Reset form
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
                setIsEditMode(false);
                setEditAccommodationId(null);
                setImageChanged(false);
                setImagesChanged(false);
                if (mainImgInputRef.current) mainImgInputRef.current.value = '';
                if (imagesInputRef.current) imagesInputRef.current.value = '';
                setActiveSections([]);
            } else {
                setMessage('Failed to save accommodation');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setSubmitLoading(false);
            await fetchAccommodations();
        }
    };

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

    useEffect(() => {
        fetchAccommodations();
    }, []);

    // Handle edit functionality
    const handleEdit = (accommodation) => {
        setMainImgSrc(accommodation.mainImgSrc);
        setImagesSrc(accommodation.imagesSrc);
        setCity(accommodation.city);
        setTitle(accommodation.title);
        setDescription(accommodation.description);
        setFacilityType(accommodation.facilityType.join(', '));
        setContact(accommodation.contact);
        setLocation(accommodation.location);
        setEditAccommodationId(accommodation._id);
        setIsEditMode(true);
        // Expand all sections
        setActiveSections(['images', 'description', 'type', 'contacts', 'location']);
        setImageChanged(false);
        setImagesChanged(false);
        if (mainImgInputRef.current) mainImgInputRef.current.value = '';
        if (imagesInputRef.current) imagesInputRef.current.value = '';
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
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
        setIsEditMode(false);
        setEditAccommodationId(null);
        setImageChanged(false);
        setImagesChanged(false);
        setActiveSections([]);
        if (mainImgInputRef.current) mainImgInputRef.current.value = '';
        if (imagesInputRef.current) imagesInputRef.current.value = '';
    };

    // Handle section toggling
    const toggleSection = (section) => {
        if (activeSections.includes(section)) {
            setActiveSections(activeSections.filter((s) => s !== section));
        } else {
            setActiveSections([...activeSections, section]);
        }
    };

    // Handle delete functionality
    const handleDelete = (accommodation) => {
        setAccommodationToDelete(accommodation);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch('/api/accommodations', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: accommodationToDelete._id }),
            });

            if (res.ok) {
                setMessage('Accommodation deleted successfully');
                await fetchAccommodations();
            } else {
                setMessage('Failed to delete accommodation');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setAccommodationToDelete(null);
        }
    };

    const cancelDelete = () => {
        setAccommodationToDelete(null);
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
                            className={`form-main max-h-[70%] overflow-y-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {/* Images Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => toggleSection('images')}
                                >
                                    Images
                                </h2>
                                {activeSections.includes('images') && (
                                    <div>
                                        {/* Main Image */}
                                        <div className="mb-4">
                                            <label htmlFor="mainImgSrc" className="block text-gray-700 font-bold mb-2">
                                                Main Image:
                                            </label>
                                            {mainImgSrc && (
                                                <img
                                                    src={mainImgSrc}
                                                    alt="Main"
                                                    className="w-full h-auto rounded mb-2"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                id="mainImgSrc"
                                                accept="image/*"
                                                onChange={handleMainImageChange}
                                                ref={mainImgInputRef}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required={!isEditMode || imageChanged}
                                                disabled={submitLoading}
                                            />
                                        </div>
                                        {/* Other Images */}
                                        <div className="mb-4">
                                            <label htmlFor="imagesSrc" className="block text-gray-700 font-bold mb-2">
                                                Other Images:
                                            </label>
                                            {imagesSrc && imagesSrc.length > 0 && (
                                                <div className="grid grid-cols-3 gap-2 mb-2">
                                                    {imagesSrc.map((src, index) => (
                                                        <img
                                                            key={index}
                                                            src={src}
                                                            alt={`Image ${index}`}
                                                            className="w-full h-auto rounded"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                id="imagesSrc"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImagesChange}
                                                ref={imagesInputRef}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required={!isEditMode || imagesChanged}
                                                disabled={submitLoading}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => toggleSection('description')}
                                >
                                    Description
                                </h2>
                                {activeSections.includes('description') && (
                                    <div>
                                        {/* Title */}
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                                Title:
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                        {/* City */}
                                        <div className="mb-4">
                                            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                                                City:
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                        {/* Description */}
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                                Description:
                                            </label>
                                            <textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                rows="3"
                                                required
                                                disabled={submitLoading}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Type Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => toggleSection('type')}
                                >
                                    Type
                                </h2>
                                {activeSections.includes('type') && (
                                    <div>
                                        {/* Facilities */}
                                        <div className="mb-4">
                                            <label htmlFor="facilities" className="block text-gray-700 font-bold mb-2">
                                                Facilities:
                                            </label>
                                            <input
                                                type="text"
                                                id="facilities"
                                                value={facilityType}
                                                onChange={(e) => setFacilityType(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter facility types separated by commas"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contacts Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => toggleSection('contacts')}
                                >
                                    Contacts
                                </h2>
                                {activeSections.includes('contacts') && (
                                    <div>
                                        {/* Address */}
                                        <div className="mb-4">
                                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                                                Address:
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={contact.address}
                                                onChange={handleContactChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                        {/* Phone */}
                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                                                Phone:
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={contact.phone}
                                                onChange={handleContactChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter phone numbers separated by commas"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                        {/* Email */}
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={contact.email}
                                                onChange={handleContactChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                        {/* Link */}
                                        <div className="mb-4">
                                            <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
                                                Link:
                                            </label>
                                            <input
                                                type="url"
                                                id="link"
                                                name="link"
                                                value={contact.link}
                                                onChange={handleContactChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                                disabled={submitLoading}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Location Section */}
                            <div>
                                <h2
                                    className="cursor-pointer font-bold text-lg mb-2"
                                    onClick={() => toggleSection('location')}
                                >
                                    Location
                                </h2>
                                {activeSections.includes('location') && (
                                    <div>
                                        {/* Location */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Coordinates:</label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="number"
                                                    value={location.coordinates[0]}
                                                    onChange={(e) => handleLocationChange(e, 0)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder="Longitude"
                                                    required
                                                    disabled={submitLoading}
                                                />
                                                <input
                                                    type="number"
                                                    value={location.coordinates[1]}
                                                    onChange={(e) => handleLocationChange(e, 1)}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                    placeholder="Latitude"
                                                    required
                                                    disabled={submitLoading}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit and Cancel Buttons */}
                            {submitLoading ? (
                                <div className={`submit-loading`}>
                                    <Spinner />
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <button
                                        type="submit"
                                        className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover"
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
                                <div className={`form-content-grid`}>
                                    {accommodations.map((item, index) => (
                                        <div key={index} className={`form-content-grid-items relative`}>
                                            <div>
                                                <Image
                                                    src={item.mainImgSrc}
                                                    alt={`Accommodation ${index}`}
                                                    priority
                                                    width={800}
                                                    height={600}
                                                    className={`rounded-2xl aspect-video`}
                                                />
                                            </div>
                                            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-tl-2xl rounded">
                                                <p>{item.city}</p>
                                            </div>
                                            <div className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                                                <p>{item.title}</p>
                                            </div>
                                            <div className="absolute top-2 right-2 flex space-x-2 p-2">
                                                <FaEdit
                                                    size={24}
                                                    onClick={() => handleEdit(item)}
                                                    className={`cursor-pointer ${
                                                        isEditMode && editAccommodationId === item._id
                                                            ? 'text-green-500'
                                                            : 'hover:text-green-500'
                                                    }`}
                                                />
                                                <FaTrashAlt
                                                    size={24}
                                                    onClick={() => handleDelete(item)}
                                                    className="cursor-pointer hover:text-red-500"
                                                />
                                            </div>
                                            {/* Red veil overlay when accommodation is being considered for deletion */}
                                            {accommodationToDelete && accommodationToDelete._id === item._id && (
                                                <div
                                                    className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50 rounded pointer-events-none"
                                                    style={{ zIndex: 10 }}
                                                ></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Custom confirmation modal */}
            {accommodationToDelete && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-white p-6 rounded-lg">
                        <p className="mb-4 text-lg">Do you want to delete the selected accommodation?</p>
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

export default AccommodationForm;
