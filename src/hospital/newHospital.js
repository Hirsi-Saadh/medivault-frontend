import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import springApiUrl from '../springConfig';

export default function NewHospital() {
    let navigate = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('uid');

    const [hospital, setHospital] = useState({
        uid: uidFromQuery,
        hospitalName: '',
        hospitalAddress: '',
        hospitalLicense: '',
        hospitalType: '',
        medicalLicenseBlob: null, // Store the file object
        medicalLicenseBase64: '', // Store the base64-encoded image
    });

    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);

    const {
        hospitalName,
        hospitalAddress,
        hospitalLicense,
        hospitalType,
        medicalLicenseBase64,
    } = hospital;

    const onInputChange = (e) => {
        if (e.target.name === 'medicalLicenseBlob') {
            const file = e.target.files[0];
            if (file) {
                // Read the selected image file and convert it to a base64 string
                const reader = new FileReader();
                reader.onload = (event) => {
                    setHospital({
                        ...hospital,
                        medicalLicenseBlob: file,
                        medicalLicenseBase64: event.target.result.split(',')[1], // Extract base64 data
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setHospital({ ...hospital, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true); // Start loading

            const formData = new FormData();
            formData.append('uid', hospital.uid);
            formData.append('hospitalName', hospital.hospitalName);
            formData.append('hospitalAddress', hospital.hospitalAddress);
            formData.append('hospitalLicense', hospital.hospitalLicense);
            formData.append('hospitalType', hospital.hospitalType);
            formData.append('medicalLicenseBase64', hospital.medicalLicenseBase64); // Send the base64-encoded image

            const response = await axios.post(`${springApiUrl}/hospital/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });

            // Handle the response as needed
            console.log('Hospital registered:', response.data);
            navigate('/'); // Redirect or show a success message
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error registering hospital:', error);
            setError('Error registering hospital. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-light">
                    <h2 className="text-center m-4">Register Hospital</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="hospitalName" className="form-label">
                                Hospital Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter hospital name"
                                name="hospitalName"
                                id="hospitalName"
                                value={hospitalName}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hospitalLicense" className="form-label">
                                License Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter license number"
                                name="hospitalLicense"
                                id="hospitalLicense"
                                value={hospitalLicense}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hospitalAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter hospital address"
                                name="hospitalAddress"
                                id="hospitalAddress"
                                value={hospitalAddress}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hospitalType" className="form-label">
                                Hospital Type
                            </label>
                            <select
                                className="form-select"
                                placeholder="Select hospital type"
                                name="hospitalType"
                                id="hospitalType"
                                value={hospitalType}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Select user type</option>
                                <option value="GOVERNMENT">Government</option>
                                <option value="PRIVATE">Private</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="medicalLicenseBlob" className="form-label">
                                Add the medical license
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="medicalLicenseBlob"
                                name="medicalLicenseBlob"
                                onChange={(e) => onInputChange(e)}
                                required

                            />
                        </div>

                        {/* Add more fields for hospital info */}
                        <button type="submit" className="btn btn-outline-primary">
                            {isLoading ? 'Registering...' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger mx-2"
                            onClick={() => navigate('/')}

                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
