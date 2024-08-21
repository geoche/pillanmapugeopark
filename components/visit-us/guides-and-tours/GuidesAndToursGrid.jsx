"use client";
import { useEffect, useState } from 'react';
import Spinner from "@components/Spinner";
import Separator from "@components/Separator";
import GuidesAndToursGridItem from "@components/visit-us/guides-and-tours/GuidesAndToursGridItem";

const ALL_LOCATIONS = 'All locations';
const ALL_TYPES = 'All types';

const GuidesAndToursGrid = () => {
    const [guidesAndTours, setGuidesAndTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [selectedCity, setSelectedCity] = useState(ALL_LOCATIONS);
    const [selectedType, setSelectedType] = useState(ALL_TYPES);
    const [cities, setCities] = useState([]);
    const [types, setType] = useState([]);
    const [filteredGuidesAndTours, setFilteredGuidesAndTours] = useState([]);

    useEffect(() => {
        const fetchGuidesAndTours = async () => {
            try {
                const res = await fetch('/api/guides-and-tours');
                if (!res.ok) {
                    console.error('Failed to fetch data');
                    return;
                }
                const data = await res.json();
                setGuidesAndTours(data);
                setCities([ALL_LOCATIONS, ...new Set(data.map(item => item.city))]);
                setType([ALL_TYPES, ...new Set(data.flatMap(item => item.type))]);
                setFilteredGuidesAndTours(data);
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 300);
            }
        };

        fetchGuidesAndTours().then(() => {});
    }, []);

    const handleCityChange = (e) => {
        setShowContent(false);
        setSelectedCity(e.target.value);
    };

    const handleSelectedTypeChange = (e) => {
        setShowContent(false);
        setSelectedType(e.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const filtered = guidesAndTours.filter(item => {
                return (selectedCity === ALL_LOCATIONS || item.city === selectedCity) &&
                    (selectedType === ALL_TYPES || item.type.includes(selectedType));
            });
            setFilteredGuidesAndTours(filtered);
            setShowContent(true);
        }, 300); // Delay for smooth transition after filtering

        return () => clearTimeout(timeout);
    }, [selectedCity, selectedType, guidesAndTours]);

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

                            <select value={selectedType} onChange={handleSelectedTypeChange}
                                    className="p-2 border rounded">
                                {types.map((facility, index) => (
                                    <option key={index} value={facility} className={`font-bold`}>
                                        {facility}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={`w-full flex flex-wrap flex-center items-center max-w-7xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                            {filteredGuidesAndTours.map((item, index) => (
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
