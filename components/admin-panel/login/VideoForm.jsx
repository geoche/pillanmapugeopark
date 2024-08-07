import { useState } from 'react';

const VideoForm = () => {
    const [videoLink, setVideoLink] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/gallery/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoLink, description }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Video saved successfully');
                setVideoLink('');
                setDescription('');
            } else {
                setMessage('Failed to save video');
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label htmlFor="videoLink" className="block text-gray-700 font-bold mb-2">YouTube Video Link:</label>
                <input
                    type="url"
                    id="videoLink"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
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
                ></textarea>
            </div>
            <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-500">
                Submit
            </button>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
    );
};

export default VideoForm;
