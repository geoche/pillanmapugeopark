﻿"use client";
import { useEffect, useState } from 'react';
import Spinner from "@components/Spinner";
import Separator from "@components/Separator";
import GuidesAndToursGridItem from "@components/visit-us/guides-and-tours/GuidesAndToursGridItem";

const ALL_LOCATIONS = 'All locations';
const ALL_FACILITIES = 'All facilities';

const GuidesAndToursGrid = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [selectedCity, setSelectedCity] = useState(ALL_LOCATIONS);
    const [selectedFacility, setSelectedFacility] = useState(ALL_FACILITIES);
    const [cities, setCities] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [filteredAccommodations, setFilteredAccommodations] = useState([]);

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
                setCities([ALL_LOCATIONS, ...new Set(data.map(item => item.city))]);
                setFacilities([ALL_FACILITIES, ...new Set(data.flatMap(item => item.facilities))]);
                setFilteredAccommodations(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchAccommodations().then(() => {});
    }, []);

    const handleCityChange = (e) => {
        setShowContent(false);
        setSelectedCity(e.target.value);
    };

    const handleFacilityChange = (e) => {
        setShowContent(false);
        setSelectedFacility(e.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const filtered = accommodations.filter(item => {
                return (selectedCity === ALL_LOCATIONS || item.city === selectedCity) &&
                    (selectedFacility === ALL_FACILITIES || item.facilities.includes(selectedFacility));
            });
            setFilteredAccommodations(filtered);
            setShowContent(true);
        }, 300); // Delay for smooth transition after filtering

        return () => clearTimeout(timeout);
    }, [selectedCity, selectedFacility, accommodations]);

    return (
        <div className="mx-auto p-4 bg-default w-full py-12">
            <h2 className={`text-h-secondary`}>Find guides and tours to your taste</h2>
            <Separator />
            <div className={`max-w-7xl flex flex-col flex-center mx-auto py-4`}>
                {loading ? (<Spinner />) : (
                    <>
                        <div className={`flex flex-row flex-center w-full py-4`}>
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
                                <GuidesAndToursGridItem
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

export default GuidesAndToursGrid;