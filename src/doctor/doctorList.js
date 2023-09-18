import React, { useEffect, useState } from 'react';
import Sidepane from '../components/layout/sidepane';
import springApiUrl from "../springConfig";

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading state for data fetching

    useEffect(() => {
        // Fetch the list of doctors from your API
        fetch(`${springApiUrl}/doctor/all`)
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data);
                setIsLoading(false); // Data fetching complete, stop loading
            })
            .catch((error) => {
                setIsLoading(false); // Data fetching failed, stop loading
                console.error('Error fetching doctors:', error);
            });
    }, []);

    // Filter doctors based on search term, specialization, and type
    const filteredDoctors = doctors.filter((doctor) => {
        const fullName = `${doctor.doctorFirstName} ${doctor.doctorLastName}`;
        const nameMatch = fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const specializationMatch = specializationFilter
            ? doctor.doctorSpecialization.toLowerCase() === specializationFilter.toLowerCase()
            : true;
        const typeMatch = typeFilter
            ? doctor.doctorType.toLowerCase() === typeFilter.toLowerCase()
            : true;

        return nameMatch && specializationMatch && typeMatch;
    });

    // Create a message to display the applied filters
    let filterMessage = '';
    if (searchTerm) {
        filterMessage += `Name: "${searchTerm}" `;
    }
    if (specializationFilter) {
        filterMessage += `Specialization: "${specializationFilter}" `;
    }
    if (typeFilter) {
        filterMessage += `Type: "${typeFilter}" `;
    }

    // Function to reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setSpecializationFilter('');
        setTypeFilter('');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <Sidepane />
                <div className="col-lg-9">
                    <h2>List of Doctors</h2>
                    {isLoading ? ( // Show loading message while fetching data
                        <p>Loading...</p>
                    ) : (
                        <div>
                            {filterMessage && <p>Applied Filters: {filterMessage}</p>}
                            <div className="input-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Doctors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onClick={resetFilters}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label htmlFor="specializationFilter">Specialization:</label>
                                    <input
                                        type="text"
                                        id="specializationFilter"
                                        className="form-control"
                                        placeholder="Filter by Specialization"
                                        value={specializationFilter}
                                        onChange={(e) => setSpecializationFilter(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="typeFilter">Type:</label>
                                    <input
                                        type="text"
                                        id="typeFilter"
                                        className="form-control"
                                        placeholder="Filter by Type"
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                    />
                                </div>
                            </div>
                            {filteredDoctors.length === 0 ? (
                                <p>No doctors found.</p>
                            ) : (
                                <div className="mt-3">
                                    {filteredDoctors.map((doctor) => (
                                        <div
                                            key={doctor.uid}
                                            onMouseEnter={() => setHoveredItem(doctor.uid)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <a
                                                href="#"
                                                className={`list-group-item list-group-item-action text-light ${
                                                    hoveredItem === doctor.uid ? 'bg-dark' : ''
                                                }`}
                                                aria-current="true"
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        {doctor.doctorFirstName} {doctor.doctorLastName}
                                                    </h5>
                                                    <small>{doctor.doctorSpecialization}</small>
                                                </div>
                                                <p className="mb-1">{doctor.doctorType}</p>
                                                <small>{doctor.doctorLicense}</small>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
