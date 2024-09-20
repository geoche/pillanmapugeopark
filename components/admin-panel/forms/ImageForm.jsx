import React, {useState, useEffect, useRef} from 'react';
import Spinner from "@components/Spinner";
import {Gallery, Item} from 'react-photoswipe-gallery';
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


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        console.log('Submitting:', {imageSrc: image, caption});

        try {
            const res = await fetch('/api/gallery/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({imageSrc: image, caption}),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (res.ok) {
                setMessage('Image saved successfully');
                setImage(null);
                setCaption('');
                fileInputRef.current.value = '';
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
            const res = await fetch('/api/gallery/images', {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                },
            });
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
        fetchImages().then(r => () => {
        });
    }, []);

    return (
        <section className={`component-section`}>
            <div className={`admin-panel-module`}>
                {loading ? (
                        <div className={`form-loading`}>
                            <Spinner/>
                        </div>    
                    ) :
                    (
                        <div className={`form-container`}>
                            <form onSubmit={handleSubmit}
                                  className={`form-main transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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
                                <div className="mb-4">
                                    <label htmlFor="caption"
                                           className="block text-gray-700 font-bold mb-2">Caption:</label>
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
                                {submitLoading ?
                                    <div className={`submit-loading`}>
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
                                                {images.map((image, index) => (
                                                    <Item
                                                        key={index}
                                                        original={image.imageSrc}
                                                        thumbnail={image.imageSrc}
                                                        width={1080}
                                                        height={720}
                                                        alt={`image`}
                                                        caption={`<h1 class="text-lg md:text-2xl text-center pb-10">${image.caption}</h1>`}
                                                    >
                                                        {({ref, open}) => (
                                                            <div ref={ref} onClick={open}>
                                                                <Image
                                                                    src={image.imageSrc}
                                                                    alt={`image`}
                                                                    width={250}
                                                                    height={200}
                                                                    className={`m-2 aspect-video object-cover`}
                                                                />
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

export default ImageForm;
