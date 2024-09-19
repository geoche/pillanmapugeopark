﻿import {useState, useEffect, useRef} from 'react';
import Spinner from "@components/Spinner";
import {Gallery, Item} from 'react-photoswipe-gallery';
import Image from 'next/image';
import 'photoswipe/dist/photoswipe.css';


const ImageForm = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

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
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
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
                }, 1);
            }
        };

        fetchImages().then(r => () => {
        });
    }, []);

    return (
        <section className={`component-section`}>
            <div className={`form-container`}>
                {loading ? (
                        <div>Loading...</div>) :
                    (
                        <div className="flex flex-row justify-end w-[95%]">
                            <form onSubmit={handleSubmit}
                                  className="w-[30%] p-4 my-4 bg-white rounded shadow-md fixed left-10 z-10">
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
                                        disabled={loading}
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
                                        disabled={loading}
                                    ></textarea>
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
                            <div className={`w-[65%] min-h-[44rem]`}>
                                <div
                                    className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="relative flex items-center max-w-screen-xl mx-auto py-4">
                                        <Gallery withCaption>
                                            <div className="flex flex-wrap justify-center items-center">
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
                                                                    className={`m-2`}
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