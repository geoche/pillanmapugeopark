"use client";
import {useEffect, useState} from 'react';
import Spinner from "@components/Spinner";
import AccommodationDetails from "@components/visit-us/accommodations/AccommodationDetails";
import HeaderOpacity from "@components/HeaderOpacity";

const AccommodationDetailsPage = ({params}) => {
    const [accommodationDetails, setAccommodationDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchAccommodationDetails = async () => {
            try {
                // Fetch the accommodation by ID
                const res = await fetch(`/api/accommodations/details/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch accommodation details');
                }

                const data = await res.json();
                setAccommodationDetails(data);
            } catch (error) {
                console.error('Error fetching accommodation details:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 1); // Short delay to ensure smooth transition
            }
        };

        fetchAccommodationDetails().then(() => {
        });
    }, []); // Add params.id as a dependency

    return (
        <section className={`component-section`}>
            <div>
                {loading ? (
                    <div className={`w-full h-screen overflow-x-hidden flex flex-center bg-default-opacity`}>
                        <Spinner/>
                    </div>
                ) : showContent && accommodationDetails ? (
                    <>
                        <HeaderOpacity title={accommodationDetails.title}/>
                        <AccommodationDetails item={accommodationDetails}/>
                    </>
                ) : (
                    <div>Accommodation not found</div>
                )}
            </div>
        </section>
    );
};

export default AccommodationDetailsPage;
