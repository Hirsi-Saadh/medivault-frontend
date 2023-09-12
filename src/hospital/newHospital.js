import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function NewHospital() {
    let navigate = useNavigate();

    const [hospital, setHospital] = useState({
        uid: "",
        hospitalName: '',
        hospitalAddress: '',
        hospitalLicense: '',
        hospitalType: '',
        medicalLicenseBlob: '', // Store the file object
    });

    const { hospitalName, hospitalAddress, hospitalLicense, hospitalType, medicalLicenseBlob } = hospital;

    const onInputChange = (e) => {
        if (e.target.name === "medicalLicenseBlob") {
            // Handle file input separately
            setHospital({ ...hospital, [e.target.name]: e.target.files[0] });
        } else {
            setHospital({ ...hospital, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("uid", hospital.uid);
            formData.append("hospitalName", hospital.hospitalName);
            formData.append("hospitalAddress", hospital.hospitalAddress);
            formData.append("hospitalLicense", hospital.hospitalLicense);
            formData.append("hospitalType", hospital.hospitalType);
            formData.append("medicalLicenseBlob", hospital.medicalLicenseBlob);
            

            const response = await axios.post('http://localhost:8080/hospital/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });

            // Handle the response as needed
            console.log("Hospital registered:", response.data);
            navigate("/"); // Redirect or show a success message
        } catch (error) {
            console.error("Error registering hospital:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Hospital</h2>
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
                                value={hospitalName}
                                onChange={(e) => onInputChange(e)}
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
                                value={hospitalLicense}
                                onChange={(e) => onInputChange(e)}
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
                                value={hospitalAddress}
                                onChange={(e) => onInputChange(e)}
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
                                name="medicalLicenseBlob"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Add more fields for hospital info */}
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/")}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
