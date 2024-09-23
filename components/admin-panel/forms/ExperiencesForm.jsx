import React, {useState, useRef, useEffect} from 'react';
import Spinner from "@components/Spinner";
import Image from "next/image";
import {FaEdit, FaTrashAlt, FaUndo} from "react-icons/fa";


const ExperiencesForm = () => {
    // State variables for form fields
    const [mainImgSrc, setMainImgSrc] = useState(null); // { src: string, isNew: boolean }
    const [imagesSrc, setImagesSrc] = useState([]); // Array of { src: string, isNew: boolean }
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // State variables for form status
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // State variables for experiences data
    const [experiences, setExperiences] = useState([]);

    // Refs for file inputs
    const mainImageInputRef = useRef(null);
    const imagesInputRef = useRef(null);

    // State variables for edit mode
    const [isEditMode, setIsEditMode] = useState(false);
    const [editExperienceId, setEditExperienceId] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [imagesChanged, setImagesChanged] = useState(false);

    // State variable for delete confirmation
    const [experienceToDelete, setExperienceToDelete] = useState(null);

    // Handle main image change
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setMainImgSrc(reader.result);
            setImageChanged(true);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setMainImgSrc(null);
            setImageChanged(false);
        }
    };

    // Handle additional images change
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        const promises = files.map(file => {
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(images => {
                const newImages = images.map((imgSrc) => ({
                    src: imgSrc,
                    isNew: true,
                }));               
                setImagesSrc(prevImages => [...prevImages, ...newImages]);
                setImagesChanged(true);
            })
    };

    // Handle additional image deletion
    const handleImageDelete = (index) => {
        setImagesSrc(prevImages => prevImages.filter((_, i) => i !== index));
        setImagesChanged(true);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowContent(false)
        setSubmitLoading(true);

        const experienceData = {
            id: isEditMode ? editExperienceId : undefined,
            mainImgSrc,
            imagesSrc,
            title,
            description,
            imageChanged,
            imagesChanged,
        };

        const method = isEditMode ? 'PATCH' : 'POST';

        try {
            const res = await fetch('/api/experiences', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(experienceData),
            });

            if (res.ok) {
                setMessage(isEditMode ? 'Experience updated successfully' : 'Experience saved successfully');
                // Reset form
                resetForm();
            } else {
                setMessage('Failed to save experience');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            await fetchExperiences();
        }
    };

    // Reset form fields and states
    const resetForm = () => {
        setMainImgSrc(null);
        setImagesSrc([]);
        setTitle('');
        setDescription('');
        setIsEditMode(false);
        setEditExperienceId(null);
        setImageChanged(false);
        setImagesChanged(false);
        if (mainImageInputRef.current) mainImageInputRef.current.value = '';
        if (imagesInputRef.current) imagesInputRef.current.value = '';
    };

    // Fetch experiences from API
    const fetchExperiences = async () => {
        try {
            const res = await fetch('/api/experiences');
            if (!res.ok) {
                console.error('Failed to fetch experiences');
                return;
            }
            const data = await res.json();
            setExperiences(data);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setSubmitLoading(false);
            setLoading(false);
            setTimeout(() => {
                setShowContent(true);
            }, 300);
        }
    };

    useEffect(() => {
        fetchExperiences();
        // Cleanup function to revoke object URLs if any (optional if using FileReader)
        return () => {
            // No need to revoke with FileReader as we used base64 strings
        };
    }, []);

    // Handle edit functionality
    const handleEdit = (experience) => {
        setMainImgSrc({src: experience.mainImgSrc, isNew: false});
        setImagesSrc(experience.imagesSrc.map(src => ({src, isNew: false})));
        setTitle(experience.title);
        setDescription(experience.description);
        setEditExperienceId(experience._id);
        setIsEditMode(true);
        setImageChanged(false);
        setImagesChanged(false);
        if (mainImageInputRef.current) mainImageInputRef.current.value = '';
        if (imagesInputRef.current) imagesInputRef.current.value = '';
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        resetForm();
    };

    // Handle delete functionality
    const handleDelete = (experience) => {
        setExperienceToDelete(experience);
    };

    // Confirm delete
    const confirmDelete = async () => {
        try {
            const res = await fetch('/api/experiences', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: experienceToDelete._id}),
            });

            if (res.ok) {
                setMessage('Experience deleted successfully');
                await fetchExperiences();
            } else {
                setMessage('Failed to delete experience');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setExperienceToDelete(null);
        }
    };

    // Cancel delete
    const cancelDelete = () => {
        setExperienceToDelete(null);
    };


    return (
        <section className={`component-section`}>
            <div className={`admin-panel-module`}>
                {loading ? (
                    <div className={`form-loading`}>
                        <Spinner/>
                    </div>
                ) : (
                    <div className={`form-container`}>
                        <form
                            onSubmit={handleSubmit}
                            className={`form-main transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {/* Main Image */}
                            <div className="mb-4">
                                <label htmlFor="mainImage" className="block text-gray-700 font-bold mb-2">
                                    Main Image:
                                </label>
                                {mainImgSrc && (
                                    <img
                                        src={mainImgSrc.src}
                                        alt="Main"
                                        className="w-full h-auto rounded mb-2"
                                    />
                                )}
                                <input
                                    type="file"
                                    id="mainImage"
                                    accept="image/*"
                                    onChange={handleMainImageChange}
                                    ref={mainImageInputRef}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required={!isEditMode || imageChanged}
                                    disabled={submitLoading}
                                />
                            </div>

                            {/* Additional Images */}
                            <div className="mb-4">
                                <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
                                    Additional Images:
                                </label>
                                {imagesSrc.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mb-2">
                                        {imagesSrc.map((imageObj, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={imageObj.src}
                                                    alt={`Additional Image ${index + 1}`}
                                                    className="w-full h-auto rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageDelete(index)}
                                                    className="absolute top-1 right-1 text-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
                                                    aria-label={`Delete additional image ${index + 1}`}
                                                >
                                                    <FaTrashAlt className={`image-management-delete-button`}/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    onChange={handleImagesChange}
                                    ref={imagesInputRef}
                                    multiple
                                    className="w-full p-2 border border-gray-300 rounded"
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

                            {/* Submit and Cancel Buttons */}
                            {submitLoading ? (
                                <div className={`submit-loading`}>
                                    <Spinner/>
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
                                            <FaUndo size={24} style={{color: '#6a9a8d'}}/>
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Success or Error Message */}
                            {!submitLoading && message && (
                                <p className="mt-4 text-center text-green-500">{message}</p>
                            )}
                        </form>

                        {/* Experiences List */}
                        <div className={`form-content-container`}>
                            <div
                                className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <div className={`form-content-grid`}>
                                    {experiences.map((expItem, index) => (
                                        <div key={index} className={`p-2 w-full sm:w-1/2 lg:w-1/3 relative`}>
                                            <div>
                                                <Image
                                                    src={expItem.mainImgSrc}
                                                    alt={`Experience ${index + 1}`}
                                                    priority
                                                    width={800}
                                                    height={600}
                                                    className={`rounded-2xl aspect-video`}
                                                />
                                            </div>
                                            <div
                                                className="absolute bottom-2 left-0 right-0 text-white py-4 px-2 rounded-tl-2xl rounded text-center">
                                                <p>{expItem.title}</p>
                                            </div>
                                            <div
                                                className={`edit-delete-buttons edit-delete-buttons-right m-2 rounded rounded-tr-2xl`}>
                                                <FaEdit
                                                    size={24}
                                                    onClick={() => handleEdit(expItem)}
                                                    className={`cursor-pointer ${
                                                        isEditMode && editExperienceId === expItem._id
                                                            ? 'text-green-500'
                                                            : 'hover:text-green-500'
                                                    }`}/>
                                                <FaTrashAlt
                                                    size={24}
                                                    onClick={() => handleDelete(expItem)}
                                                    className="cursor-pointer hover:text-red-500"
                                                    aria-label={`Delete experience ${index + 1}`}
                                                />
                                            </div>
                                            {/* Red veil overlay when experience is being considered for deletion */}
                                            {experienceToDelete && experienceToDelete._id === expItem._id && (
                                                <div
                                                    className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50 rounded pointer-events-none"
                                                    style={{zIndex: 10}}
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

            {/* Confirmation Modal for Deletion */}
            {experienceToDelete && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="bg-white p-6 rounded-lg">
                        <p className="mb-4 text-lg">Do you want to delete the selected experience?</p>
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
        </section>);
};

export default ExperiencesForm;
