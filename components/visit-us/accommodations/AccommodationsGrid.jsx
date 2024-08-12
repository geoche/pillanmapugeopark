"use client"
import { useEffect, useState } from 'react';
import AccommodationsGridItem from "@components/visit-us/accommodations/AccommodationsGridItem";

const AccommodationsGrid = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await fetch('/api/accommodations');
                if (!res.ok) {
                    throw new Error('Failed to fetch accommodations');
                }
                const data = await res.json();
                setAccommodations(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, []);

    if (loading) {
        return <p>Loading accommodations...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-full bg-default">
            <div
                className="flex flex-wrap items-center flex-center max-w-screen-xl px-4 py-12 mx-auto sm:px-6">
                {accommodations.map((item, index) => (
                    <AccommodationsGridItem
                        index={index}
                        item={item}
                        key={`aci-${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccommodationsGrid;
