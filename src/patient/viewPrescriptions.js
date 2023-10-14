import React, { useState, useEffect } from 'react';
import springApiUrl from '../springConfig';
import { useAuth } from '../firebase';
import Sidepane from "../components/layout/sidepane";
import { formatDate } from '../assets/utils/timeUtils';
import QRCode from "react-qr-code";

const ViewPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]); // State to hold the list of prescriptions
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for Firebase user
    const user = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [channelingIdForQR, setChannelingIdForQR] = useState(null);

    // Function to handle "View QR" link click
    const handleLinkClick = (channelingId) => {
        setChannelingIdForQR(channelingId); // Set the channeling ID for QR code generation
        setShowModal(true); // Show the modal
    };

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

    const modalStyle = {
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        margin: 'auto',
    };

    const modalContentStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        maxWidth: '500px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
    };

    const closeButtonStyle = {
        float: 'right',
        cursor: 'pointer',
        fontSize: '20px',
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
                            <h2>Your Channeling History</h2>
                            {prescriptions.length > 0 ? (
                                <ul className="list-group mt-2">
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
                                            <div>
                                            <a href="#" onClick={() => handleLinkClick(prescription.id)}>
                                                <span className="badge bg-warning rounded-pill me-2">View QR</span>
                                            </a>
                                            <a href={`/patient/prescriptions/medication/view?id=${prescription.id}`}><span className="badge bg-primary rounded-pill">Details</span></a>
                                            </div>
                                        </li>

                                    ))}
                                    {/* Modal for QR code */}
                                    {showModal && (
                                        <div className="modal" style={modalStyle}>
                                            <div className="modal-content" style={modalContentStyle}>
                                                <span className="close" style={closeButtonStyle} onClick={() => setShowModal(false)}>&times;</span>
                                                <div className='container p-4' style={{backgroundColor:'white'}}>
                                                {channelingIdForQR && (
                                                    <QRCode value={`${channelingIdForQR}`}
                                                            viewBox={`0 0 256 256`}
                                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                            size={256}/>
                                                )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </ul>


                            ) : (
                                <div className='m-2 p-2'>
                                <p>No channeling sessions found...</p>
                                </div>
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
