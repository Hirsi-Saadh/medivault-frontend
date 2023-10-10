import React, { useState, useEffect } from 'react';
import springApiUrl from '../springConfig';
import { useAuth } from '../firebase';
import Sidepane from "../components/layout/sidepane";
import { formatDate } from '../assets/utils/timeUtils';

const ViewPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]); // State to hold the list of prescriptions
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for Firebase user
    const user = useAuth();

    useEffect(() => {
        // Check if the Firebase user is available
        if (user) {
            // Fetch the list of prescriptions for the logged-in user
            fetchPrescriptions(user.uid);
        }
    }, [user]);

    const fetchPrescriptions = async (userUid) => {
        try {
            // Fetch the prescriptions from the backend using the user UID
            const response = await fetch(`${springApiUrl}/channeling/getChannelingRecords?patientUid=${userUid}`);

            if (response.ok) {
                const diagnosesData = await response.json();
                // Sort prescriptions in descending order based on channeling ID
                diagnosesData.sort((a, b) => b.id - a.id);
                setPrescriptions(diagnosesData);
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
                            <h2>Your Prescriptions</h2>
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
                                                height: '80px', // Increased height
                                                transition: 'background-color 0.2s', // Hover effect
                                                borderRadius: '10px 10px 10px 10px',
                                            }}
                                        >
                                            <div className='p-2'>
                                                <span style={{ color: '#454a57', letterSpacing: '1px', fontWeight: '700', fontSize: '13px', margin: '0' }}>
                                                    CHANNELING ID #{prescription.id}
                                                </span><br />
                                                <strong>Doctor Name:</strong> {prescription.doctorFirstName} {prescription.doctorLastName}<br />
                                                {formatDate(prescription.addedTime)}
                                            </div>
                                            <a href={`/patient/prescriptions/medication/view?id=${prescription.id}`}><span className="badge bg-primary rounded-pill">Details</span></a>
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

export default ViewPrescription;
