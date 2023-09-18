import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import springApiUrl from "../springConfig";

export default function NewLaboratory() {
    let navigate = useNavigate();

    const [laboratory, setLaboratory] = useState({
        name: "",
        licenseNumber: "",
        address: "",
        // Add more fields for laboratory info
    });

    const { name, licenseNumber, address /* Add more fields here */ } = laboratory;

    const onInputChange = (e) => {
        setLaboratory({ ...laboratory, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await getCsrfToken();

        try {
            const response = await axios.post(
                `${springApiUrl}:8080/laboratories/register`,
                laboratory, // Send laboratory data to the server
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle the response as needed
            console.log("Laboratory registered:", response.data);

            // Redirect or show a success message
            navigate("/success");
        } catch (error) {
            console.error("Error registering laboratory:", error);
        }
    };

    async function getCsrfToken() {
        try {
            const response = await axios.get(`${springApiUrl}/csrf/token`);
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
                    <h2 className="text-center m-4">Register Laboratory</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Laboratory Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter laboratory name"
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
                                placeholder="Enter laboratory address"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {/* Add more fields for laboratory info */}
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
