"use client"
import {useState, useEffect} from 'react';
import Spinner from "@components/Spinner";
import ExperiencesGridItem from "@components/visit-us/experiences/ExperiencesGridItem";

const ExperiencesGrid = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const res = await fetch('/api/experiences');
                if (!res.ok) {
                    console.error('Failed to fetch data');
                    return;
                }
                const data = await res.json();
                setExperiences(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchExperiences().then(() => {
        });
    }, []);

    return (
        <div className={`w-full ${loading ? `h-[32rem]` : null} bg-default py-12`}>
            {loading ?
                <div className={`w-full py-24 flex flex-center`}>
                    <Spinner/>
                </div>
                : (
                    <div
                        className={`w-full flex flex-wrap flex-center items-center max-w-7xl p-4 mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        {experiences.map((post, index) => (
                            <ExperiencesGridItem expItem={post} index={index}/>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default ExperiencesGrid;
