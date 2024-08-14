"use client";
import {useEffect, useState} from 'react';
import AccommodationsGridItem from "@components/visit-us/accommodations/AccommodationsGridItem";
import Spinner from "@components/Spinner";
import Separator from "@components/Separator";

const AccommodationsGrid = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [selectedCity, setSelectedCity] = useState('All locations');
    const [selectedFacility, setSelectedFacility] = useState('All facilities');
    const [cities, setCities] = useState([]);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const res = await fetch('/api/accommodations');
                if (!res.ok) {
                    console.error('Failed to fetch accommodations');
                    return;
                }
                const data = await res.json();
                setAccommodations(data);
                setCities(['All locations', ...new Set(data.map(item => item.city))]);
                setFacilities(['All facilities', ...new Set(data.map(item => item.facilities))]);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 1);
            }
        };

        fetchAccommodations().then(() => {
        });
    }, []);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleFacilityChange = (e) => {
        setSelectedFacility(e.target.value);
    };

    const filteredAccommodations = accommodations.filter(item => {
        return (selectedCity === 'All locations' || item.city === selectedCity) &&
            (selectedFacility === 'All facilities' || item.facilities === selectedFacility);
    });

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <h2 className={`text-h-secondary`}>Find an accommodation</h2>
            <Separator/>
            <div className={`max-w-7xl flex flex-col flex-center mx-auto py-4`}>
                {loading ? (<Spinner/>) : (
                    <>
                        <div className="flex flex-row flex-center w-full py-4">
                            <select value={selectedCity} onChange={handleCityChange} className={`p-2 mx-4 border rounded`}>
                                {cities.map((city, index) => (
                                    <option key={index} value={city} className={`font-bold`}>
                                        {city}
                                    </option>
                                ))}
                            </select>

                            <select value={selectedFacility} onChange={handleFacilityChange}
                                    className="p-2 border rounded">
                                {facilities.map((facility, index) => (
                                    <option key={index} value={facility} className={`font-bold`}>
                                        {facility}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={`w-full flex flex-wrap flex-center items-center max-w-7xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                            {filteredAccommodations.map((item, index) => (
                                <AccommodationsGridItem
                                    index={index}
                                    item={item}
                                    key={`aci-${index}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default AccommodationsGrid;
