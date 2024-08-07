import {useEffect, useState} from 'react';
import ImageGallery from "@components/ImageGallery";
import Separator from "@components/Separator";
import Spinner from "@components/Spinner";

const PhotoGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);


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
                }, 1); // Short delay to ensure smooth transition
            }
        };

        fetchImages().then(r => () => {
        });
    }, []);

    return (<div className="bg-default py-12">
            <div className="text-center text-white w-full">
                <h2 className="text-3xl font-bold mb-8 md:mb-10">IMAGE GALLERY</h2>
                <Separator/>
                {loading ? (<Spinner/>) : (<div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}><ImageGallery images={images}/></div>)}
                <Separator/>
            </div>
        </div>);
};

export default PhotoGallery;
