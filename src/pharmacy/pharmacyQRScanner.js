import React, { useState, useEffect } from 'react';
import { useAuth } from '../firebase';
import Sidepane from '../components/layout/sidepane';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import springApiUrl from "../springConfig";

export default function PharmacyQRScanner() {
    const user = useAuth();
    const [qrData, setQrData] = useState(null);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [channelingData, setChannelingData] = useState(null);
    const [isDuplicateRequest, setIsDuplicateRequest] = useState(false);
    let navigate = useNavigate();

    const handleScan = (data) => {
        if (data) {
            // Check if this QR code data has been processed before
            if (qrData === data) {
                setIsDuplicateRequest(true);
            } else {
                setQrData(data);
                setIsDuplicateRequest(false);
                setLoading(false);
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

    useEffect(() => {
        if (qrData && !isDuplicateRequest) {
            // Store the received data in the session
            sessionStorage.setItem('channelingData', JSON.stringify(channelingData));

            fetch(`${springApiUrl}/pharmacy/viewByChannelingId/${qrData}`)
                .then((response) => {
                    console.log(response);
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error fetching channeling data. Status: ${response.status}`);
                    }
                })
                .then((data) => {
                    setChannelingData(data);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
    }, [qrData, isDuplicateRequest]);

    function handleMoreInfoClick() {
        if (channelingData) {
            // Extract prescription and patient data from the response
            const prescriptions = channelingData.prescription;
            const patient = channelingData.patient;

            // You can use prescriptions and patient data as needed
            console.log('Prescription:', prescriptions);
            console.log('Patient:', patient);

            // Navigate to the appropriate page with the fetched channeling data
            navigate(`/pharmacy/view/prescription`, { state: { channelingData } });
        }
    }

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
                                    {qrData && channelingData ? (
                                        <div style={{ width: '100%' }}>
                                            <div style={{ textAlign: 'left' }}>
                                                <h4>Scanned Channeling Details:</h4>
                                                {/* Display the patient's name fetched from the backend */}
                                                <p>Patient Name: <strong>{channelingData.patient.firstName} {channelingData.patient.lastName}</strong></p>
                                            </div>

                                            <div>
                                                <button className="btn btn-primary" onClick={handleMoreInfoClick}>
                                                    More Info
                                                </button>
                                            </div>
                                        </div>
                                    ) : isDuplicateRequest ? (
                                        <p>Duplicate request. Please scan a new QR code.</p>
                                    ) : (
                                        <p>Scan a valid channeling QR code.</p>
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
