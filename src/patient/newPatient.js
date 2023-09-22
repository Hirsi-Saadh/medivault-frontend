import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import springApiUrl from "../springConfig";

const NewPatient = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('uid');

    const navigate = useNavigate();

    const [patientInfo, setPatientInfo] = useState({
        uid: uidFromQuery,
        firstName: '',
        lastName: '',
        age: '',
        address: '',
        dateOfBirth: ''
        // Add any other fields you need
    });

    // eslint-disable-next-line no-unused-vars
    const { uid, firstName, lastName, age, address, dateOfBirth } = patientInfo;

    const handleChange = (e) => {
        const { name, value } = e.target;
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
                age: '',
                address: '',
                // Clear any other fields you need


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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth
                    </label>
                    {/*<DatePicker*/}
                    {/*    className="form-control"*/}
                    {/*    selected={dateOfBirth}*/}
                    {/*    onChange={(date) => setPatientInfo({ ...patientInfo, dateOfBirth: date })}*/}
                    {/*    showYearDropdown*/}
                    {/*    yearDropdownItemNumber={65}*/}

                    {/*    required*/}

                    {/*/>*/}
                </div>

                {/* Add additional fields as needed */}
                <button type="submit" className="btn btn-primary">
                    Add Patient
                </button>
            </form>
        </div>
    );
};

export default NewPatient;
