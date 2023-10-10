import React, { useState, useEffect } from 'react';
import springApiUrl from '../springConfig';
import { useAuth } from '../firebase';
import Sidepane from "../components/layout/sidepane";
import { useLocation } from "react-router-dom";

const PrescribedMedication = () => {
    const [prescriptions, setPrescriptions] = useState([]); // State to hold the list of prescriptions
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for Firebase user
    const user = useAuth();

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const ChanellingIdFromQuery = params.get('id');

    useEffect(() => {
        // Check if the Firebase user is available
        if (user) {
            // Fetch the list of prescriptions for the logged-in user
            fetchPrescriptions(user.uid, ChanellingIdFromQuery);
        }
    }, [user, ChanellingIdFromQuery]);

    const fetchPrescriptions = async (userUid, channelingId) => {
        try {
            // Fetch the prescriptions from the backend using the user UID and channeling ID
            const response = await fetch(`${springApiUrl}/prescriptions/viewByChannelingId/${channelingId}`);

            if (response.ok) {
                const prescriptionsData = await response.json();
                setPrescriptions(prescriptionsData);
            } else {
                console.error('Failed to fetch prescriptions');
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
                <div className="mt-3 ms-4 pt-3 container">
                    {loadingUser ? (
                        <p>Loading...</p>
                    ) : user ? (
                        <div>
                            <h2>Your Medication</h2>
                            {prescriptions.length > 0 ? (
                                <ul className="list-group">
                                    {prescriptions.map((prescription, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            style={{
                                                backgroundColor: '#171717',
                                                marginBottom: '10px',
                                                border: 'none',
                                                color: '#fff', // Light text color
                                                height: 'auto', // Increased height
                                                transition: 'background-color 0.2s', // Hover effect
                                            }}
                                        >
                                            <div>
                                                <span style={{ color: '#454a57', letterSpacing: '1px', fontWeight: '700', fontSize: '13px', margin: '0' }}>
                                                    CHANNELING ID #{prescription.channelingUid}
                                                </span><br />
                                                <strong>Medication Name:</strong> {prescription.medicationName}<br />
                                                <strong>Medication Dosage:</strong> {prescription.dosage}<br />
                                                <strong>Medication Type:</strong> {prescription.medicationType}<br />
                                            </div>
                                            <span className="badge bg-primary rounded-pill">Details</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No Medication found.</p>
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

export default PrescribedMedication;
