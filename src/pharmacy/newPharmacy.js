import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import springApiUrl from '../springConfig';

export default function NewPharmacy() {
    let navigate = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('uid');

    const [pharmacy, setPharmacy] = useState({
        uid: uidFromQuery,
        pharmacyName: '',
        pharmacyAddress: '',
        pharmacyLicense: '',
        pharmacyType: '',
        pharmacyLicenseBlob: null, // Store the file object
        pharmacyLicenseBase64: '', // Store the base64-encoded image
    });

    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);

    const {
        pharmacyName,
        pharmacyAddress,
        pharmacyLicense,
        pharmacyType,
        pharmacyLicenseBase64,
    } = pharmacy;

    const onInputChange = (e) => {
        if (e.target.name === 'pharmacyLicenseBlob') {
            const file = e.target.files[0];
            if (file) {
                // Read the selected image file and convert it to a base64 string
                const reader = new FileReader();
                reader.onload = (event) => {
                    setPharmacy({
                        ...pharmacy,
                        pharmacyLicenseBlob: file,
                        pharmacyLicenseBase64: event.target.result.split(',')[1], // Extract base64 data
                    });
                };
                reader.readAsDataURL(file);
            }
        } else {
            setPharmacy({ ...pharmacy, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true); // Start loading

            const formData = new FormData();
            formData.append('uid', pharmacy.uid);
            formData.append('pharmacyName', pharmacy.pharmacyName);
            formData.append('pharmacyAddress', pharmacy.pharmacyAddress);
            formData.append('pharmacyLicense', pharmacy.pharmacyLicense);
            formData.append('pharmacyType', pharmacy.pharmacyType);
            formData.append('pharmacyLicenseBase64', pharmacy.pharmacyLicenseBase64); // Send the base64-encoded image

            const response = await axios.post(`${springApiUrl}/pharmacy/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });

            // Handle the response as needed
            console.log('Pharmacy registered:', response.data);
            navigate('/'); // Redirect or show a success message
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error registering pharmacy:', error);
            setError('Error registering pharmacy. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-light">
                    <h2 className="text-center m-4">Register Pharmacy</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="pharmacyName" className="form-label">
                                Pharmacy Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter pharmacy name"
                                name="pharmacyName"
                                id="pharmacyName"
                                value={pharmacyName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pharmacyLicense" className="form-label">
                                License Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter license number"
                                name="pharmacyLicense"
                                id="pharmacyLicense"
                                value={pharmacyLicense}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pharmacyAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter pharmacy address"
                                name="pharmacyAddress"
                                id="pharmacyAddress"
                                value={pharmacyAddress}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pharmacyType" className="form-label">
                                Pharmacy Type
                            </label>
                            <select
                                className="form-select"
                                placeholder="Select pharmacy type"
                                name="pharmacyType"
                                id="pharmacyType"
                                value={pharmacyType}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Select user type</option>
                                <option value="GOVERNMENT">Government</option>
                                <option value="PRIVATE">Private</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pharmacyLicenseBlob" className="form-label">
                                Add the pharmacy license
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="pharmacyLicenseBlob"
                                name="pharmacyLicenseBlob"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Add more fields for pharmacy info */}
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
