import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import springApiUrl from '../springConfig';

const NewPatient = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('uid');

    const navigate = useNavigate();

    const [patientInfo, setPatientInfo] = useState({
        uid: uidFromQuery,
        firstName: '',
        lastName: '',
        age: 0, // Initialize age as 0
        address: '',
        dateOfBirth: null,
        height: 0, // Initialize height as 0
        weight: 0, // Initialize weight as 0
        bloodGroup: '',
    });

    const { firstName, lastName, age, address, dateOfBirth, height, weight, bloodGroup } = patientInfo;

    const handleChange = (name, value) => {
        setPatientInfo({
            ...patientInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your Spring Boot backend to save patient information
            const response = await axios.post(`${springApiUrl}/patients/add`, patientInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle the response as needed (e.g., show a success message)
            console.log('Patient information added:', response.data);
            navigate('/');

            // Clear the form fields
            setPatientInfo({
                uid: uidFromQuery,
                firstName: '',
                lastName: '',
                age: 0,
                address: '',
                dateOfBirth: null,
                height: 0,
                weight: 0,
                bloodGroup: '',
            });
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error adding patient information:', error);
        }
    };

    return (
        <div className="col-md-5 offset-md-3 mt-3 container text-light">
            <h2>Add New Patient Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={age}
                        onChange={(e) => handleChange('age', e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth
                    </label>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <DatePicker
                            className="form-control"
                            value={dateOfBirth}
                            onChange={(date) => handleChange('dateOfBirth', date)}
                            renderInput={(params) => <input {...params} />}
                            showYearDropdown
                            format="yyyy-MM-dd"
                            yearDropdownItemNumber={65}
                            required
                        />
                    </LocalizationProvider>
                </div>
                <div className="mb-3">
                    <label htmlFor="height" className="form-label">
                        Height in (cm)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="height"
                        name="height"
                        value={height}
                        onChange={(e) => handleChange('height', parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">
                        Weight in (kg)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bloodGroup" className="form-label">
                        Blood Group (Example: O+ , O-, AB+, AB-)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={bloodGroup}
                        onChange={(e) => handleChange('bloodGroup', e.target.value)}
                        required
                    />
                </div>
                {/* ... */}
                <button type="submit" className="btn btn-primary">
                    Add Patient
                </button>
            </form>
        </div>
    );
};

export default NewPatient;
