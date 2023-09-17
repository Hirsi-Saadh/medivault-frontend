import React from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import Sidepane from '../components/layout/sidepane';
import QRCode from "react-qr-code";

export default function PatientQRGenerator() {
    const user = useAuth(); // Use the useAuth hook to get the authenticated user

    return (
        <div className="d-flex" style={{maxHeight: '80vh'}}>
            <Sidepane />
            <div className="container" >
                <div className="mt-3 ms-4 pt-3 container d-flex" >
                    {user ? (
                        <>
                            <h4 className="pt-3 text-light">Welcome back {user.email}, </h4>

                            <div style={{ background: 'white', padding: '16px', height: "auto", margin: "0 auto", maxWidth: 175, width: "100%" }}>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={user.uid}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p> // You can replace this with a loading indicator
                    )}
                </div>
            </div>
        </div>
    );
}
