"use client"
import {useEffect, useState} from 'react';
import AccommodationsGridItem from "@components/visit-us/accommodations/AccommodationsGridItem";
import Spinner from "@components/Spinner";
import Separator from "@components/Separator";

const AccommodationsGrid = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await fetch('/api/accommodations');
                if (!res.ok) {
                    console.error('Failed to fetch accommodations');
                }
                const data = await res.json();
                setAccommodations(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 1); // Short delay to ensure smooth transition
            }
        };

        fetchAccommodations();
    }, []);

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <h2 className={`text-h-secondary`}>Find an accommodation</h2>
            <Separator/>
            <div className={`max-w-7xl flex flex-col flex-center mx-auto py-4`}>
                {loading ? (<Spinner/>) : (
                    <div
                        className={`w-full flex flex-wrap flex-center items-center max-w-7xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        {accommodations.map((item, index) => (
                            <AccommodationsGridItem
                                index={index}
                                item={item}
                                key={`aci-${index}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>

    )

};

export default AccommodationsGrid;
