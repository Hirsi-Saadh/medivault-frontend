import React, { useState, useEffect } from 'react';
import Sidepane from '../components/layout/sidepane';
import { QrReader } from 'react-qr-reader';

export default function PharmacyQRScanner() {
    const [qrData, setQrData] = useState(null);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
    const [scanError, setScanError] = useState(null);

    // Function to handle QR code scan
    const handleScan = (data) => {
        if (data) {
            setQrData(data);
        }
    };

    // Function to handle QR code scan error
    const handleError = (err) => {
        console.error(err);
        setScanError(err);
    };

    // Request camera permission on component mount
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => setCameraPermissionGranted(true))
            .catch((error) => {
                console.error(error);
                setScanError("Camera permission not granted.");
            });
    }, []);

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container d-flex flex-column align-items-center">
                    <h2>Scan Prescription QR</h2>
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div>
                            <div>
                                {cameraPermissionGranted ? (
                                    <div style={{ width: '300px', height: 'auto' }}>
                                        <QrReader
                                            style={{ justifyItems: 'center' }}
                                            constraints={{ facingMode: 'user' }}
                                            onScan={handleScan}
                                            onError={handleError}
                                            videoId="video"
                                            scanDelay={500}
                                            videoStyle={{ width: '100%' }}
                                        />
                                    </div>
                                ) : (
                                    <p>{scanError || 'Loading scan...'}</p>
                                )}
                            </div>

                            <div>
                                {qrData && (
                                    <div style={{ width: '100%' }}>
                                        <div style={{ textAlign: 'left' }}>
                                            <h4>Scanned Data:</h4>
                                            <p>{qrData}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
