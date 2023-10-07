import React, { useState, useEffect } from 'react';
import { useAuth } from '../firebase';
import Sidepane from '../components/layout/sidepane';
import { QrReader } from 'react-qr-reader';
import { usePatientData } from '../patient/patientUtils';
import { useNavigate } from 'react-router-dom';

export default function DoctorQRScanner() {
    const user = useAuth();
    const [qrData, setQrData] = useState(null);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
    const [validPatient, setValidPatient] = useState(false);
    let navigate = useNavigate();

    const {
        Uid,
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
            setPatientByUid(data);
        }
    };

    // Function to handle QR code scan error
    // eslint-disable-next-line no-unused-vars
    const handleError = (err) => {
        console.error(err);
    };

    // Request camera permission on component mount
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => setCameraPermissionGranted(true))
            .catch((error) => console.error(error));
    }, []);

    // Validate if the patient data is available and set validPatient accordingly
    useEffect(() => {
        if (FirstName && LastName && Age && Address && DateOfBirth) {
            setValidPatient(true);
        } else {
            setValidPatient(false);
        }
    }, [Uid, FirstName, LastName, Age, Address, DateOfBirth]);

    function handleMoreInfoClick() {
        if (validPatient && qrData) {
            // Construct the URL with the UID obtained from the QR code
            const url = `/doctor/chanelling/view-patient?patient_uid=${qrData}`;

            // Store patient data in session storage
            sessionStorage.setItem('patientData', JSON.stringify({
                Uid,
                FirstName,
                LastName,
                Age,
                Address,
                DateOfBirth,
            }));

            // Navigate to the URL
            navigate(url);
        } else {
            // Handle the case when the patient is not valid or there's no QR data
            console.error('Invalid patient or no QR data.');
        }
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
                                        validPatient ? (
                                            <div style={{ width: '100%' }}>
                                                <div style={{ textAlign: 'left' }}>
                                                    <h4>Scanned Patient Details:</h4>
                                                    <p>UID: <strong>{Uid}</strong> </p>
                                                    <p style={{ textTransform: 'capitalize' }}>First Name: <strong>{FirstName}</strong> </p>
                                                    <p style={{ textTransform: 'capitalize' }}>Last Name: <strong>{LastName}</strong></p>
                                                    <p>Age: <strong>{Age}</strong></p>
                                                    <p>Address: <strong>{Address}</strong></p>
                                                    <p>Date of Birth: <strong>{DateOfBirth}</strong></p>
                                                </div>

                                                <div>
                                                    <button className="btn btn-primary" onClick={handleMoreInfoClick}>
                                                        More Info
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Invalid QR Code. Please scan a valid patient QR code.</p>
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
