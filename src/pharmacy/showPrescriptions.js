import React, { useEffect, useState } from 'react';
import Sidepane from "../components/layout/sidepane";

const ShowPrescriptions = () => {
    const [patientData, setPatientData] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        // Retrieve stored session data
        const sessionData = JSON.parse(sessionStorage.getItem('channelingData'));

        if (sessionData) {
            setPatientData(sessionData.patient);
            setPrescriptions(sessionData.prescription);
        }

        // Clear session data when leaving the page or closing the session
        // window.onbeforeunload = () => {
        //     sessionStorage.removeItem('channelingData');
        // };
    }, []);

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container d-flex flex-column align-items-center">

            {patientData && (
                <div className='container'>
                    <div className='container m-5 mt-2 ps-5 pe-5 pt-0'>
                    <h2 style={{textTransform:'capitalize'}}>{patientData.firstName}'s Prescription</h2>

                    <div className='d-flex pt-3 pb-2 ps-4 pe-4 bg-dark' style={{justifyContent:'space-between', borderRadius:'25px 25px 25px 25px'}}>
                        <p style={{textTransform:'capitalize'}}>Patient Name: <strong>{patientData.firstName} {patientData.lastName}</strong></p>
                        <p>Age: <strong>{patientData.age}</strong></p>
                    </div>
                    </div>
                </div>
            )}
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
                                        color: '#fff',
                                        height: 'auto',
                                        transition: 'background-color 0.2s',
                                        justifyContent:'space-between',
                                    }}
                                >
                                    <div className='d-flex'>
                                        <p className='me-3'><strong>Medication Name:</strong> {prescription.medicationName}</p>
                                        <p className='me-3'><strong>Medication Dosage:</strong> {prescription.dosage}</p>
                                        <p className='me-3'><strong>Medication Type:</strong> {prescription.medicationType}</p>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No prescriptions available.</p>
                    )}
        </div>
            </div>
        </div>


    );
};

export default ShowPrescriptions;
