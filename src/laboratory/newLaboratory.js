import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import springApiUrl from '../springConfig';

export default function NewLaboratory() {
    let navigate = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('uid');

    const [laboratory, setLaboratory] = useState({
        uid: uidFromQuery,
        laboratoryName: '',
        laboratoryAddress: '',
        laboratoryLicense: '',
        laboratoryType: '',
        medicalLicenseBlob: null, // Store the file object
        medicalLicenseBase64: '', // Store the base64-encoded image
    });

    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);

    const {
        laboratoryName,
        laboratoryAddress,
        laboratoryLicense,
        laboratoryType,
        medicalLicenseBase64,
    } = laboratory;

    const onInputChange = (e) => {
        if (e.target.name === 'medicalLicenseBlob') {
            const file = e.target.files[0];
            if (file) {
                // Read the selected image file and convert it to a base64 string
                const reader = new FileReader();
                reader.onload = (event) => {
                    setLaboratory({
                        ...laboratory,
                        medicalLicenseBlob: file,
                        medicalLicenseBase64: event.target.result.split(',')[1], // Extract base64 data
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setLaboratory({ ...laboratory, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true); // Start loading

            const formData = new FormData();
            formData.append('uid', laboratory.uid);
            formData.append('laboratoryName', laboratory.laboratoryName);
            formData.append('laboratoryAddress', laboratory.laboratoryAddress);
            formData.append('laboratoryLicense', laboratory.laboratoryLicense);
            formData.append('laboratoryType', laboratory.laboratoryType);
            formData.append('medicalLicenseBase64', laboratory.medicalLicenseBase64); // Send the base64-encoded image

            const response = await axios.post(`${springApiUrl}/laboratory/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });

            // Handle the response as needed
            console.log('Laboratory registered:', response.data);
            navigate('/'); // Redirect or show a success message
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error registering laboratory:', error);
            setError('Error registering laboratory. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-light">
                    <h2 className="text-center m-4">Register Laboratory</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="laboratoryName" className="form-label">
                                Laboratory Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter laboratory name"
                                name="laboratoryName"
                                id="laboratoryName"
                                value={laboratoryName}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="laboratoryLicense" className="form-label">
                                License Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter license number"
                                name="laboratoryLicense"
                                id="laboratoryLicense"
                                value={laboratoryLicense}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="laboratoryAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter laboratory address"
                                name="laboratoryAddress"
                                id="laboratoryAddress"
                                value={laboratoryAddress}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="laboratoryType" className="form-label">
                                Laboratory Type
                            </label>
                            <select
                                className="form-select"
                                placeholder="Select laboratory type"
                                name="laboratoryType"
                                id="laboratoryType"
                                value={laboratoryType}
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

                        {/* Add more fields for laboratory info */}
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
