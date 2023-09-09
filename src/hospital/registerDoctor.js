import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function NewDoctor() {
    let navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        name: "",
        licenseNumber: "",
        specialization: "",
        // Add more fields for doctor info
    });

    const { name, licenseNumber, specialization /* Add more fields here */ } = doctor;

    const onInputChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await getCsrfToken();

        try {
            const response = await axios.post(
                "http://localhost:8080/doctors/register",
                doctor, // Send doctor data to the server
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle the response as needed
            console.log("Doctor registered:", response.data);

            // Redirect or show a success message
            navigate("/success");
        } catch (error) {
            console.error("Error registering doctor:", error);
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
                    <h2 className="text-center m-4">Register Doctor</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Doctor's Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter doctor's name"
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
                            <label htmlFor="specialization" className="form-label">
                                Specialization
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter doctor's specialization"
                                name="specialization"
                                value={specialization}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        {/* Add more fields for doctor info */}
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
