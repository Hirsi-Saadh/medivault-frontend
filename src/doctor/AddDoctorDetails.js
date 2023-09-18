import axios from "axios";
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import springApiUrl from "../springConfig";

export default function AddDoctorDetails() {
    let navigate = useNavigate();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('uid');

    const [doctor, setDoctor] = useState({
        uid: uidFromQuery,
        doctorFirstName: '',
        doctorLastName: '',
        doctorAddress: '',
        doctorLicense: '',
        doctorType: '',
        doctorSpecialization:'',
        doctorImageBlob: null,
        doctorImageBase64: '',
        doctorLicenseBlob: null,
        doctorLicenseBase64: '',
    });

    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);

    const {doctorFirstName, doctorLastName,doctorAddress,doctorLicense,doctorType, doctorSpecialization,doctorImageBase64,doctorLicenseBase64} = doctor;

    const handleDoctorImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return; // No file selected, do nothing
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setDoctor((prevDoctor) => ({
                ...prevDoctor,
                doctorImageBlob: file,
                doctorImageBase64: event.target.result.split(',')[1],
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleLicenseImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return; // No file selected, do nothing
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setDoctor((prevDoctor) => ({
                ...prevDoctor,
                doctorLicenseBlob: file,
                doctorLicenseBase64: event.target.result.split(',')[1],
            }));
        };
        reader.readAsDataURL(file);
    };

    const onInputChange = (e) => {
        if (e.target.name === 'doctorImageBlob') {
            handleDoctorImageChange(e);
        } else if (e.target.name === 'doctorLicenseBlob') {
            handleLicenseImageChange(e);
        } else {
            setDoctor({ ...doctor, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true); // Set isLoading to true when data submission starts

            const formData = new FormData();
            formData.append("uid", doctor.uid);
            formData.append("doctorFirstName", doctor.doctorFirstName);
            formData.append("doctorLastName", doctor.doctorLastName);
            formData.append("doctorAddress", doctor.doctorAddress);
            formData.append("doctorLicense", doctor.doctorLicense);
            formData.append("doctorType", doctor.doctorType);
            formData.append("doctorSpecialization", doctor.doctorSpecialization);
            formData.append("doctorImageBase64", doctor.doctorImageBase64);
            formData.append("doctorLicenseBase64", doctor.doctorLicenseBase64);

            const response = await axios.post(`${springApiUrl}/doctor/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Doctor details added:", response.data);
            navigate("/"); // Redirect or show a success message
        } catch (error) {
            console.error("Error adding doctor details:", error);
            setError(error.message);
        } finally {
            setIsLoading(false); // Set isLoading to false when data submission completes
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow text-light">
                    <h2 className="text-center m-4">Add Doctor Details</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="doctorFirstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter first name"
                                name="doctorFirstName"
                                id="doctorFirstName"
                                value={doctorFirstName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorLastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter last name"
                                name="doctorLastName"
                                id="doctorLastName"
                                value={doctorLastName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorLicense" className="form-label">
                                License Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter license number"
                                name="doctorLicense"
                                id="doctorLicense"
                                value={doctorLicense}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter address"
                                name="doctorAddress"
                                id="doctorAddress"
                                value={doctorAddress}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorType" className="form-label">
                                Doctor Type
                            </label>
                            <select
                                className="form-select"
                                name="doctorType"
                                id="doctorType"
                                value={doctorType}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Select doctor type</option>
                                <option value="GENERAL">General</option>
                                <option value="SPECIALIST">Specialist</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorSpecialization" className="form-label">
                                Specialization
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Doctor Specialization"
                                name="doctorSpecialization"
                                id="doctorSpecialization"
                                value={doctorSpecialization}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="doctorImageBlob" className="form-label">
                                Add Doctor's Image
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="doctorImageBlob"
                                name="doctorImageBlob"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="doctorLicenseBlob" className="form-label">
                                Add Doctor's License
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="doctorLicenseBlob"
                                name="doctorLicenseBlob"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/")}>
                            Cancel
                        </button>
                    </form>
                    {error && <div className="text-danger">{error}</div>}
                </div>
            </div>
        </div>
    );
}
