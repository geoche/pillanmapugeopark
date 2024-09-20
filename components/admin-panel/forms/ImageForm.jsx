import { useState, useEffect, useRef } from 'react';
import Spinner from "@components/Spinner";
import { FaEdit, FaTrashAlt, FaUndo } from "react-icons/fa";
import { Gallery, Item } from 'react-photoswipe-gallery';
import Image from 'next/image';
import 'photoswipe/dist/photoswipe.css';

const ImageForm = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    // New state variables for edit mode
    const [isEditMode, setIsEditMode] = useState(false);
    const [editImageId, setEditImageId] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    // New state variable for delete confirmation
    const [imageToDelete, setImageToDelete] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
            setImageSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImageSrc(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const apiUrl = '/api/gallery/images';
            const method = isEditMode ? 'PATCH' : 'POST';
            const body = isEditMode
                ? { id: editImageId, caption }
                : { imageSrc: image, caption };

            const res = await fetch(apiUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setMessage(isEditMode ? 'Image updated successfully' : 'Image saved successfully');
                setCaption('');
                setImage(null);
                setImageSrc(null);
                fileInputRef.current.value = '';
                setIsEditMode(false);
                setEditImageId(null);
            } else {
                setMessage('Failed to save image');
            }
        } catch (error) {
            console.log(error);
            setMessage('An error occurred');
        } finally {
            setSubmitLoading(false);
            await fetchImages();
        }
    };


    const fetchImages = async () => {
        try {
            const res = await fetch('/api/gallery/images');
            const data = await res.json();
            setImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setShowContent(true);
            }, 300);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    // Handle edit functionality
    const handleEdit = (image) => {
        setCaption(image.caption);
        setImageSrc(image.imageSrc);
        setEditImageId(image._id);
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsEditMode(true);
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setCaption('');
        setImage(null);
        setImageSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsEditMode(false);
        setEditImageId(null);
    };

    // Handle delete functionality
    const handleDelete = (image) => {
        setImageToDelete(image);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch('/api/gallery/images', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: imageToDelete._id }),
            });

            if (res.ok) {
                setMessage('Image deleted successfully');
                await fetchImages();
            } else {
                setMessage('Failed to delete image');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        } finally {
            setImageToDelete(null);
        }
    };


    const cancelDelete = () => {
        setImageToDelete(null);
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
                                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
                                {isEditMode && imageSrc && (
                                    <img src={imageSrc} alt="Current Image" className="w-[50%] h-auto rounded mb-2" />
                                )}
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required={!isEditMode}
                                    disabled={isEditMode || submitLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">Caption:</label>
                                <textarea
                                    id="caption"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    rows="4"
                                    required
                                    disabled={submitLoading}
                                ></textarea>
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
                            {!submitLoading && message && <p className="mt-4 text-center text-green-500">{message}</p>}
                        </form>
                        <div className={`form-content-container`}>
                            <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                <div className={`form-content-image-gallery-container`}>
                                    <Gallery withCaption>
                                        <div className={`form-content-image-gallery-content`}>
                                            {images.map((image, index) => (
                                                <div key={index} className="relative m-2">
                                                    <div className={`flex flex-row justify-end space-x-2 py-2`}>
                                                        <FaEdit
                                                            size={24}
                                                            onClick={() => handleEdit(image)}
                                                            className={`cursor-pointer ${
                                                                isEditMode && editImageId === image._id
                                                                    ? 'text-green-500'
                                                                    : 'hover:text-green-500'
                                                            }`}
                                                        />
                                                        <FaTrashAlt
                                                            size={24}
                                                            onClick={() => handleDelete(image)}
                                                            className="cursor-pointer hover:text-red-500"
                                                        />
                                                    </div>
                                                    {/* Red veil overlay when image is being considered for deletion */}
                                                    {imageToDelete && imageToDelete._id === image._id && (
                                                        <div
                                                            className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50 rounded pointer-events-none"
                                                            style={{ zIndex: 10 }}
                                                        ></div>
                                                    )}
                                                    <Item
                                                        original={image.imageSrc}
                                                        thumbnail={image.imageSrc}
                                                        width={1080}
                                                        height={720}
                                                        alt={`image`}
                                                        caption={`<h1 class="text-lg md:text-2xl text-center pb-10">${image.caption}</h1>`}
                                                    >
                                                        {({ ref, open }) => (
                                                            <div ref={ref} onClick={open}>
                                                                <Image
                                                                    src={image.imageSrc}
                                                                    alt={`image`}
                                                                    width={250}
                                                                    height={200}
                                                                    className={`aspect-video object-cover rounded`}
                                                                />
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
            {imageToDelete && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-white p-6 rounded-lg">
                        <p className="mb-4 text-lg">
                            Do you want to delete selected image?
                        </p>
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

export default ImageForm;
