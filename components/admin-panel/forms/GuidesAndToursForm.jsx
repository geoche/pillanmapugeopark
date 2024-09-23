"use client";
import React, { useState, useRef, useEffect } from 'react';
import Spinner from "@components/Spinner";
import Image from "next/image";
import { FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";

const GuidesAndToursForm = () => {
    // State variables
    const [mainImgSrc, setMainImgSrc] = useState(null);
    // imagesSrc is now an array of objects with src and isNew properties
    const [imagesSrc, setImagesSrc] = useState([]);
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [types, setTypes] = useState(''); // Comma-separated string
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

    const [guidesAndTours, setGuidesAndTours] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const mainImgInputRef = useRef(null);
    const imagesInputRef = useRef(null);

    // State variables for edit mode
    const [isEditMode, setIsEditMode] = useState(false);
    const [editGuideId, setEditGuideId] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [imagesChanged, setImagesChanged] = useState(false);

    // State variable for delete confirmation
    const [guideToDelete, setGuideToDelete] = useState(null);

    // Handle main image change
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

    // Handle other images change
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
            const newImages = images.map((imgSrc) => ({
                src: imgSrc,
                isNew: true,
            }));
            setImagesSrc((prevImages) => [...prevImages, ...newImages]);
            setImagesChanged(true); // Mark that the additional images have been changed
        });
    };

    // Handle contact fields change
    const handleContactChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    // Handle location fields change
    const handleLocationChange = (e, index) => {
        const newCoordinates = [...location.coordinates];
        newCoordinates[index] = parseFloat(e.target.value);
        setLocation({ ...location, coordinates: newCoordinates });
    };

    // Handle form submission (create or edit)
    const handleSubmit = async (e) => {
        setLoading(true);
        setSubmitLoading(true);
        setMessage('');
        e.preventDefault();

        const typesArray = types.split(',').map((type) => type.trim());

        const guidesAndToursData = {
            mainImgSrc,
            imagesSrc, // Array of image objects with src and isNew
            city,
            title,
            description,
            type: typesArray, // Align with Mongoose model's 'type' field
            contact,
            location,
            imageChanged,
            imagesChanged,
            id: isEditMode ? editGuideId : undefined,
        };

        const method = isEditMode ? 'PATCH' : 'POST';

        try {
            const res = await fetch('/api/guides-and-tours', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(guidesAndToursData),
            });

            if (res.ok) {
                setMessage(isEditMode ? 'Guide/Tour operator updated successfully' : 'Guide/Tour operator created successfully');
                // Reset form fields
                setMainImgSrc(null);
                setImagesSrc([]);
                setCity('');
                setTitle('');
                setDescription('');
                setTypes('');
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
                setEditGuideId(null);
                setImageChanged(false);
                setImagesChanged(false);
                if (mainImgInputRef.current) mainImgInputRef.current.value = '';
                if (imagesInputRef.current) imagesInputRef.current.value = '';
                setActiveSections([]);
            } else {
                const errorData = await res.text();
                setMessage(`Failed to save data: ${errorData}`);
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while saving the data');
        } finally {
            await fetchGuidesAndTours();
        }
    };

    // Fetch existing guides and tours
    const fetchGuidesAndTours = async () => {
        try {
            const res = await fetch('/api/guides-and-tours');
            if (!res.ok) {
                console.error('Failed to fetch guides and tours');
                return;
            }
            const data = await res.json();
            setGuidesAndTours(data);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
            setSubmitLoading(false);
            setTimeout(() => {
                setShowContent(true);
            }, 300);
        }
    };

    useEffect(() => {
        fetchGuidesAndTours();
    }, []);

    // Handle edit functionality
    const handleEdit = (guide) => {
        setMainImgSrc(guide.mainImgSrc);
        setImagesSrc(
            guide.imagesSrc.map((imgSrc) => ({
                src: imgSrc,
                isNew: false,
            }))
        );
        setCity(guide.city);
        setTitle(guide.title);
        setDescription(guide.description);
        setTypes(guide.type.join(', ')); // Convert array to comma-separated string
        setContact(guide.contact);
        setLocation(guide.location);
        setEditGuideId(guide._id);
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
        setTypes('');
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
        setEditGuideId(null);
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

    // Handle image deletion
    const handleImageDelete = (index) => {
        setImagesSrc((prevImages) => prevImages.filter((_, i) => i !== index));
        setImagesChanged(true);
    };

    // Handle delete functionality for guides and tours
    const handleDelete = (guide) => {
        setGuideToDelete(guide);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch('/api/guides-and-tours', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: guideToDelete._id }),
            });

            if (res.ok) {
                setMessage('Guide/Tour operator deleted successfully');
                await fetchGuidesAndTours();
            } else {
                const errorData = await res.text();
                setMessage(`Failed to delete guide/tour operator: ${errorData}`);
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while deleting the guide/tour operator');
        } finally {
            setGuideToDelete(null);
        }
    };

    const cancelDelete = () => {
        setGuideToDelete(null);
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
                                                    {imagesSrc.map((imageObj, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={imageObj.src}
                                                                alt={`Image ${index}`}
                                                                className="w-full h-auto rounded"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleImageDelete(index)}
                                                                className="absolute top-1 right-1 text-white rounded-full p-1"
                                                            >
                                                                <FaTrashAlt className={`image-management-delete-button`}/>
                                                            </button>
                                                        </div>
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
                                                rows="4"
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
                                        {/* Types */}
                                        <div className="mb-4">
                                            <label htmlFor="types" className="block text-gray-700 font-bold mb-2">
                                                Type(s):
                                            </label>
                                            <input
                                                type="text"
                                                id="types"
                                                value={types}
                                                onChange={(e) => setTypes(e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Enter types separated by commas"
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
                                        {/* Coordinates */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">
                                                Coordinates:
                                            </label>
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
                                    {guidesAndTours.map((item, index) => (
                                        <div key={index} className={`form-content-grid-items relative`}>
                                            <div>
                                                <Image
                                                    src={item.mainImgSrc}
                                                    alt={`Guides-and-tours-${index}`}
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
                                            <div className={`edit-delete-buttons edit-delete-buttons-right rounded rounded-tr-2xl m-2`}>
                                                <FaEdit
                                                    size={24}
                                                    onClick={() => handleEdit(item)}
                                                    className={`cursor-pointer ${
                                                        isEditMode && editGuideId === item._id
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
                                            {/* Red veil overlay when guide/tour is being considered for deletion */}
                                            {guideToDelete && guideToDelete._id === item._id && (
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
            {guideToDelete && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-white p-6 rounded-lg">
                        <p className="mb-4 text-lg">Do you want to delete the selected guide/tour operator?</p>
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

export default GuidesAndToursForm;
