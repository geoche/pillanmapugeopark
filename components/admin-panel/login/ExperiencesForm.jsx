import {useState, useRef} from 'react';
import Spinner from "@components/Spinner";

const ExperiencesForm = () => {
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const mainImageInputRef = useRef(null);
    const imagesInputRef = useRef(null);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setMainImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setMainImage(null);
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const promises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises)
            .then(setImages)
            .catch(() => setImages([]));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('Submitting:', {mainImgSrc: mainImage, imagesSrc: images, title, description});

        try {
            const res = await fetch('/api/experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mainImgSrc: mainImage,
                    imagesSrc: images,
                    title,
                    description
                }),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (res.ok) {
                setMessage('Experience saved successfully');
                setMainImage(null);
                setImages([]);
                setTitle('');
                setDescription('');
                mainImageInputRef.current.value = '';
                imagesInputRef.current.value = '';
            } else {
                setMessage('Failed to save experience');
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
                <label htmlFor="mainImage" className="block text-gray-700 font-bold mb-2">Main Image:</label>
                <input
                    type="file"
                    id="mainImage"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    ref={mainImageInputRef}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={loading}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Additional Images:</label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    onChange={handleImagesChange}
                    ref={imagesInputRef}
                    multiple
                    className="w-full p-2 border border-gray-300 rounded"
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
            {loading ?
                <div className="w-full flex justify-center">
                    <Spinner/>
                </div> : (
                    <button
                        type="submit"
                        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500"
                        disabled={loading}
                    >
                        Submit
                    </button>)}

            {!loading && message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default ExperiencesForm;
