"use client";
import {useEffect, useState} from 'react';
import Spinner from "@components/Spinner";
import HeaderOpacity from "@components/HeaderOpacity";
import GuidesAndToursDetails from "@components/visit-us/guides-and-tours/GuidesAndToursDetails";

const GuidesAndToursDetailsPage = ({params}) => {
    const [guidesAndToursDetails, setGuidesAndToursDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchGuidesAndToursDetails = async () => {
            try {
                const res = await fetch(`/api/guides-and-tours/details/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    console.log('Failed to fetch entry details');
                }

                const data = await res.json();
                setGuidesAndToursDetails(data);
            } catch (error) {
                console.error('Error fetching entry details:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 1); // Short delay to ensure smooth transition
            }
        };

        fetchGuidesAndToursDetails().then(() => {
        });
    }, []); // Add params.id as a dependency

    return (
        <section className={`component-section`}>
            <div>
                {loading ? (
                    <div className={`w-full h-screen overflow-x-hidden flex flex-center bg-default-opacity`}>
                        <Spinner/>
                    </div>
                ) : showContent && guidesAndToursDetails ? (
                    <>
                        <HeaderOpacity title={guidesAndToursDetails.title}/>
                        <GuidesAndToursDetails item={guidesAndToursDetails}/>
                    </>
                ) : (
                    <div>Entry not found</div>
                )}
            </div>
        </section>
    );
};

export default GuidesAndToursDetailsPage;
