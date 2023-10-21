import React, { useState, useEffect } from 'react';
import { useAuth } from '../firebase';
import Sidepane from '../components/layout/sidepane';
import { QrReader } from 'react-qr-reader';
import springApiUrl from "../springConfig";
import { usePatientData } from '../patient/patientUtils';
import { useNavigate } from "react-router-dom";

export default function LaboratoryQRScanner() {
    const user = useAuth();
    const [qrData, setQrData] = useState(null);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDuplicateRequest, setIsDuplicateRequest] = useState(false);
    const navigate = useNavigate();

    // Use the patient data hook
    const { Uid, FirstName, email, LastName, Age,Address, bloodGroup, setPatientByUid } = usePatientData();

    useEffect(() => {
        if (qrData && Uid) {
            setLoading(true);

            // Fetch additional data from the backend
            fetch(`${springApiUrl}/patients/info?uid=${Uid}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error fetching patient data. Status: ${response.status}`);
                    }
                })
                .then((data) => {
                    setPatientByUid(data);
                    sessionStorage.setItem('patientData', JSON.stringify({
                        Uid,
                        FirstName,
                        LastName,
                        Age,
                        Address,
                        bloodGroup,
                        // Add more data as needed
                    }));
                    console.log('Patient data stored in session:', {
                        Uid,
                        FirstName,
                        LastName,
                        Age,
                        Address,
                        bloodGroup,
                        // Add more data as needed
                    });

                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    }, [qrData, Uid, setPatientByUid, navigate]);

    const handleScan = (data) => {
        if (data) {
            if (qrData === data) {
                setIsDuplicateRequest(true);
            } else {
                setQrData(data);
                setIsDuplicateRequest(false);

                // Set the patient data by UID
                setPatientByUid(data);
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => setCameraPermissionGranted(true))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container d-flex flex-column align-items-center">
                    <h2>Scan QR Code</h2>
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
                                    {qrData && Uid ? (
                                        <div style={{ width: '100%' }}>
                                            <div style={{ textAlign: 'left' }}>
                                                <h4>Scanned Patient Details:</h4>
                                                <p>Patient Name: <strong>{FirstName} {LastName}</strong></p>
                                                <p>Age: <strong>{Age}</strong></p>
                                                {/* Add more patient details here */}
                                            </div>

                                            <div>
                                                <button className="btn btn-primary" onClick={() => navigate('/laboratory/manage/reports')}>
                                                    More Info
                                                </button>
                                            </div>
                                        </div>
                                    ) : isDuplicateRequest ? (
                                        <p>Duplicate request. Please scan a new QR code.</p>
                                    ) : (
                                        <p>Scan a valid patient QR code.</p>
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
