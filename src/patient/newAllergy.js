import React, { useState, useEffect } from 'react';
import springApiUrl from '../springConfig';
import { useAuth } from '../firebase';
import Sidepane from "../components/layout/sidepane";

const NewAllergy = () => {
    const [allergies, setAllergies] = useState([{ allergyName: '', allergyDescription: '', patientUid: '' }]);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for Firebase user
    const user = useAuth();

    useEffect(() => {
        // Check if the Firebase user is available
        if (user) {
            // User is authenticated, set the UID and loading state to false
            setAllergies([{ allergyName: '', allergyDescription: '', patientUid: user.uid }]);
            setLoadingUser(false);
        }
    }, [user]);

    const handleAddRow = () => {
        setAllergies([...allergies, { allergyName: '', allergyDescription: '', patientUid: user.uid }]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedAllergies = [...allergies];
        updatedAllergies[index][name] = value;
        setAllergies(updatedAllergies);
    };

    const handleRemoveRow = (index) => {
        const updatedAllergies = [...allergies];
        updatedAllergies.splice(index, 1);
        setAllergies(updatedAllergies);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the allergies before sending to the backend
        const validationErrors = validateAllergies();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setSuccessMessage('');
            return;
        }

        try {
            // Send the list of allergies to the backend
            console.log('Data to send to backend:', allergies);

            const response = await fetch(`${springApiUrl}/patients/allergy/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(allergies),
            });

            if (response.ok) {
                const createdAllergies = await response.json();
                // Handle the response from the backend, e.g., display a success message
                console.log('Allergies added:', createdAllergies);
                setSuccessMessage('Allergies added successfully.');
                setErrors([]);
                setAllergies([{ allergyName: '', allergyDescription: '', patientUid: user.uid }]);
            } else {
                // Handle the case where the request to the backend failed
                console.error('Failed to add allergies');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Validate the allergies before submission
    const validateAllergies = () => {
        const errors = [];
        allergies.forEach((allergy, index) => {
            if (!allergy.allergyName.trim()) {
                errors.push(`Allergy #${index + 1} name is required.`);
            }
            if (!allergy.allergyDescription.trim()) {
                errors.push(`Allergy #${index + 1} description is required.`);
            }
        });
        return errors;
    };

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container" >
                {loadingUser ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div>
                        <h2>Add Allergies</h2>
                        <form onSubmit={handleSubmit}>
                            {allergies.map((allergy, index) => (
                                <div key={index} className="mt-3 row mb-2">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="allergyName"
                                            value={allergy.allergyName}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Allergy Name"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="allergyDescription"
                                            value={allergy.allergyDescription}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Allergy Description"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        {index === 0 ? (
                                            <button
                                                type="button"
                                                onClick={handleAddRow}
                                                className="btn btn-success"
                                            >
                                                +
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRow(index)}
                                                className="btn btn-danger"
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="text-danger">
                                {errors.map((error, index) => (
                                    <p key={index} className="error-message">
                                        {error}
                                    </p>
                                ))}
                            </div>
                            <div className="text-success">
                                {successMessage && <p className="success-message">{successMessage}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Save Allergies
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>Please sign in to use this feature.</div>
                )}
                </div>
            </div>
        </div>
    );
};

export default NewAllergy;
