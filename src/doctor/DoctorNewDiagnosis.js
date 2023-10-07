import React, { useState, useEffect } from 'react';
import springApiUrl from '../springConfig';
import { useAuth } from '../firebase';
import Sidepane from "../components/layout/sidepane";

const DoctorNewDiagnosis = () => {
    const [diagnoses, setDiagnoses] = useState([{ diagnosisName: '', diagnosisDescription: '', patientUid: '' }]);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for Firebase user
    const user = useAuth();

    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        // Retrieve patient data from session storage
        const storedPatientData = sessionStorage.getItem('patientData');
        if (storedPatientData) {
            const parsedPatientData = JSON.parse(storedPatientData);
            setPatientData(parsedPatientData);
        }
    }, []);

    useEffect(() => {
        // Check if the Firebase user is available
        if (user) {
            // User is authenticated, set the UID and loading state to false
            setDiagnoses([{ diagnosisName: '', diagnosisDescription: '', patientUid: patientData.Uid }]);
            setLoadingUser(false);
        }
    }, [user]);

    const handleAddRow = () => {
        setDiagnoses([...diagnoses, { diagnosisName: '', diagnosisDescription: '', patientUid: user.Uid }]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedDiagnoses = [...diagnoses];
        updatedDiagnoses[index][name] = value;
        setDiagnoses(updatedDiagnoses);
    };

    const handleRemoveRow = (index) => {
        const updatedDiagnoses = [...diagnoses];
        updatedDiagnoses.splice(index, 1);
        setDiagnoses(updatedDiagnoses);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the diagnoses before sending to the backend
        const validationErrors = validateDiagnoses();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setSuccessMessage('');
            return;
        }

        try {
            // Send the list of diagnoses to the backend
            console.log('Data to send to backend:', diagnoses);

            const response = await fetch(`${springApiUrl}/patients/diagnosis/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(diagnoses),
            });

            if (response.ok) {
                const createdDiagnoses = await response.json();
                // Handle the response from the backend, e.g., display a success message
                console.log('Diagnoses added:', createdDiagnoses);
                setSuccessMessage('Diagnoses added successfully.');
                setErrors([]);
                setDiagnoses([{ diagnosisName: '', diagnosisDescription: '', patientUid: user.uid }]);
            } else {
                // Handle the case where the request to the backend failed
                console.error('Failed to add diagnoses');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Validate the diagnoses before submission
    const validateDiagnoses = () => {
        const errors = [];
        diagnoses.forEach((diagnosis, index) => {
            if (!diagnosis.diagnosisName.trim()) {
                errors.push(`Diagnosis #${index + 1} name is required.`);
            }
            if (!diagnosis.diagnosisDescription.trim()) {
                errors.push(`Diagnosis #${index + 1} description is required.`);
            }
        });
        return errors;
    };

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container" >
                {loadingUser ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div>
                        <h2>Add Diagnoses</h2>
                        <form onSubmit={handleSubmit}>
                            {diagnoses.map((diagnosis, index) => (
                                <div key={index} className="mt-3 row mb-2">
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="diagnosisName"
                                            value={diagnosis.diagnosisName}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Diagnosis Name"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            name="diagnosisDescription"
                                            value={diagnosis.diagnosisDescription}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Diagnosis Description"
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
                                Save Diagnoses
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

export default DoctorNewDiagnosis;
