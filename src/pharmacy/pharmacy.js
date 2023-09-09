import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function NewPharmacy() {
    let navigate = useNavigate();

    const [pharmacy, setPharmacy] = useState({
        name: "",
        licenseNumber: "",
        address: "",
        // Add more fields for pharmacy info
    });

    const { name, licenseNumber, address /* Add more fields here */ } = pharmacy;

    const onInputChange = (e) => {
        setPharmacy({ ...pharmacy, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await getCsrfToken();

        try {
            const response = await axios.post(
                "http://localhost:8080/pharmacies/register",
                pharmacy, // Send pharmacy data to the server
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle the response as needed
            console.log("Pharmacy registered:", response.data);

            // Redirect or show a success message
            navigate("/success");
        } catch (error) {
            console.error("Error registering pharmacy:", error);
        }
    };

    async function getCsrfToken() {
        try {
            const response = await axios.get("http://localhost:8080/csrf/token");
            const csrfToken = response.data;
            console.log("This is the CSRF Token:", csrfToken);
            return csrfToken;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Pharmacy</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Pharmacy Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter pharmacy name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="licenseNumber" className="form-label">
                                License Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter license number"
                                name="licenseNumber"
                                value={licenseNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter pharmacy address"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {/* Add more fields for pharmacy info */}
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
