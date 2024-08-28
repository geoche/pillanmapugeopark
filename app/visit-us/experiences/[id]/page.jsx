"use client";
import {useEffect, useState} from 'react';
import Spinner from "@components/Spinner";
import HeaderOpacity from "@components/HeaderOpacity";
import ExperiencesDetails from "@components/visit-us/experiences/ExperiencesDetails";

const ExperiencesDetailsPage = ({params}) => {
    const [experiencesEntry, setExperiencesEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const fetchExperiencesEntry = async () => {
            try {
                const res = await fetch(`/api/experiences/details/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    console.log('Failed to fetch entry details');
                }

                const data = await res.json();
                setExperiencesEntry(data);
            } catch (error) {
                console.error('Error fetching entry details:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 1); // Short delay to ensure smooth transition
            }
        };

        fetchExperiencesEntry().then(() => {
        });
    }, []);

    return (
        <section className={`component-section`}>
            <div>
                {loading ? (
                    <div className={`w-full h-screen overflow-x-hidden flex flex-center bg-default-opacity`}>
                        <Spinner/>
                    </div>
                ) : showContent && experiencesEntry ? (
                    <>
                        <HeaderOpacity title={experiencesEntry.title}/>
                        <ExperiencesDetails item={experiencesEntry}/>
                    </>
                ) : (
                    <div>Entry not found</div>
                )}
            </div>
        </section>

    );
};

export default ExperiencesDetailsPage;



