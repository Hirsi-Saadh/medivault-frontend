import React, { useState, useEffect } from 'react';
import springApiUrl from '../springConfig';
import { useAuth } from '../firebase';
import Sidepane from "../components/layout/sidepane";

const ViewDiagnosis = () => {
    const [diagnoses, setDiagnoses] = useState([]); // State to hold the list of diagnoses
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for Firebase user
    const user = useAuth();

    useEffect(() => {
        // Check if the Firebase user is available
        if (user) {
            // Fetch the list of diagnoses for the logged-in user
            fetchAllergies(user.uid);
        }
    }, [user]);

    const fetchAllergies = async (userUid) => {
        try {
            // Fetch the diagnoses from the backend using the user UID
            const response = await fetch(`${springApiUrl}/patients/diagnosis/all?uid=${userUid}`);

            if (response.ok) {
                const diagnosesData = await response.json();
                setDiagnoses(diagnosesData);
            } else {
                console.error('Failed to fetch diagnoses');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingUser(false);
        }
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
                            <h2>Your Allergies</h2>
                            {diagnoses.length > 0 ? (
                                <ul className="list-group">
                                    {diagnoses.map((diagnosis, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            style={{
                                                backgroundColor: '#171717',
                                                marginBottom: '10px',
                                                border: 'none',
                                                color: '#fff', // Light text color
                                                height: '80px', // Increased height
                                                transition: 'background-color 0.2s', // Hover effect
                                            }}
                                        >
                                            <div>
                                                <strong>Allergy Name:</strong> {diagnosis.diagnosisName}<br />
                                                <strong>Allergy Description:</strong> {diagnosis.diagnosisDescription}
                                            </div>
                                            <span className="badge bg-primary rounded-pill">Details</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No allergies found.</p>
                            )}
                        </div>


                    ) : (
                        <div>Please sign in to use this feature.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewDiagnosis;
