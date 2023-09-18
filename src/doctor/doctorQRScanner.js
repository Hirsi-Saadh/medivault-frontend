import React, { useState, useEffect } from 'react';
import { useAuth } from '../firebase';
import Sidepane from '../components/layout/sidepane';
import { QrReader } from 'react-qr-reader';
import { usePatientData } from '../patient/patientUtils';
import {useUserData} from "../users/userUtils"; // Replace with the correct path

export default function DoctorQRScanner() {
    const user = useAuth();
    const { userType, email, username } = useUserData(user);
    const [qrData, setQrData] = useState(null);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
    const [validPatient, setValidPatient] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true); // Added loading state for user data

    const {
        FirstName,
        LastName,
        Age,
        Address,
        DateOfBirth,
        setPatientByUid,
    } = usePatientData();

    // Function to handle QR code scan
    const handleScan = (data) => {
        if (data) {
            setQrData(data);

            // Assuming the scanned data is a UID, set the patient based on the UID
            setIsLoadingData(true); // Start loading data
            setPatientByUid(data)
                .then(() => {
                    setIsLoadingData(false); // Data fetching complete, stop loading
                })
                .catch((error) => {
                    setIsLoadingData(false); // Data fetching failed, stop loading
                    console.error(error);
                });
        }
    };

    // Function to handle QR code scan error
    const handleError = (err) => {
        console.error(err);
    };

    // Function to fetch user data
    const fetchUserData = () => {
        // Assuming you have an async function to fetch user data, replace 'fetchUserData' with your actual function
        return fetchUserData(user)
            .then(() => {

                setIsLoadingUser(false); // User data fetching complete, stop loading
            })
            .catch((error) => {
                setIsLoadingUser(false); // User data fetching failed, stop loading
                console.error(error);
            });
    };

    // Fetch user data before rendering the component
    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    // Render loading state while user data is being fetched
    if (isLoadingUser) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container d-flex flex-column align-items-center">
                    <h2>Scan Patient's QR</h2>
                    {user ? (
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <div>
                                <div>
                                    {cameraPermissionGranted ? (
                                        <div style={{ width: '300px', height: 'auto' }}>
                                            <QrReader
                                                style={{ justifyItems: 'center' }}
                                                constraints={{ facingMode: 'user' }}
                                                onResult={handleScan}
                                                videoId="video"
                                                scanDelay={500}
                                                videoStyle={{ width: '100%' }}
                                            />
                                        </div>
                                    ) : (
                                        <p>Camera permission not granted.</p>
                                    )}
                                </div>

                                <div>
                                    {qrData && ( // Display error message only when a QR code is detected
                                        isLoadingData ? ( // Show loading message while fetching data
                                            <p>Loading patient data...</p>
                                        ) : validPatient ? (
                                            <div style={{ width: '100%' }}>
                                                <div style={{ textAlign: 'left' }}>
                                                    <h4>Scanned Patient Details:</h4>
                                                    <p style={{ textTransform: 'capitalize' }}>First Name: <strong>{FirstName}</strong> </p>
                                                    <p style={{ textTransform: 'capitalize' }}>Last Name: <strong>{LastName}</strong></p>
                                                    <p>Age: <strong>{Age}</strong></p>
                                                    <p>Address: <strong>{Address}</strong></p>
                                                    <p>Date of Birth: <strong>{DateOfBirth}</strong></p>
                                                </div>

                                                <div>
                                                    <a href='#' className="btn btn-primary">
                            <span>
                              More Info
                            </span>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'left' }}>
                                                <p>Some patient data is missing or invalid:</p>
                                                {FirstName ? null : <p>First Name is missing</p>}
                                                {LastName ? null : <p>Last Name is missing</p>}
                                                {Age ? null : <p>Age is missing</p>}
                                                {Address ? null : <p>Address is missing</p>}
                                                {DateOfBirth ? null : <p>Date of Birth is missing</p>}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
