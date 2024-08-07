import { useState } from 'react';

const ImageForm = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState('');

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

        console.log('Submitting:', { imageSrc: image, caption });

        try {
            const res = await fetch('/api/gallery/images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageSrc: image, caption }),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (res.ok) {
                setMessage('Image saved successfully');
                setImage(null);
                setCaption('');
            } else {
                setMessage('Failed to save image');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
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
                ></textarea>
            </div>
            <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500">
                Submit
            </button>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default ImageForm;
