import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import Sidepane from '../components/layout/sidepane';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePatientData } from '../patient/patientUtils';
import { useAllergyData } from '../patient/allergyUtils';
import {useDiagnosisData} from "../patient/diagnosisUtils"; // Import the useAllergyData hook

export default function ViewPatientByDoctor() {
    const user = useAuth(); // Use the useAuth hook to get the authenticated user
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('patient_uid');
    const navigate = useNavigate();
    console.log('UID from query:', uidFromQuery);

    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        // Retrieve patient data from session storage
        const storedPatientData = sessionStorage.getItem('patientData');
        if (storedPatientData) {
            const parsedPatientData = JSON.parse(storedPatientData);
            setPatientData(parsedPatientData);
        }
    }, []);

    // Fetch allergy data based on the UID from the query
    const { allergies } = useAllergyData(uidFromQuery); // Pass uidFromQuery to fetch allergy data
    // Fetch diagnosis data based on the patient UID
    const { diagnosis} = useDiagnosisData(uidFromQuery);

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container d-flex">
                    <div>
                        <h2>Patient Information</h2>
                        {patientData ? (
                            <div>
                                <p>First Name: {patientData.FirstName}</p>
                                <p>Last Name: {patientData.LastName}</p>
                                <p>Age: {patientData.Age}</p>
                                <p>Address: {patientData.Address}</p>
                                <p>Date of Birth: {patientData.DateOfBirth}</p>
                            </div>
                        ) : (
                            <p>Loading patient information...</p>
                        )}
                    </div>

                    {/* Display list of allergies */}
                    {allergies && allergies.length > 0 && (
                        <div>
                            <h2>Allergies</h2>
                            <ul>
                                {allergies.map((allergy, index) => (
                                    <li key={index}>
                                        <p>Allergy Name: {allergy.allergyName}</p>
                                        <p>Description: {allergy.allergyDescription}</p>
                                        <p>Created At: {allergy.createdAt}</p>
                                        {/* Render other allergy properties as needed */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Display a message if no allergies are available */}
                    {allergies && allergies.length === 0 && (
                        <div>
                            <p>No allergies found for this patient.</p>
                        </div>
                    )}

                    {/* Display list of diagnosis */}
                    {diagnosis && diagnosis.length > 0 && (
                        <div>
                            <h2>Diagnosis</h2>
                            <ul>
                                {diagnosis.map((diagnosis, index) => (
                                    <li key={index}>
                                        <p>Diagnosis Name: {diagnosis.diagnosisName}</p>
                                        <p>Description: {diagnosis.diagnosisDescription}</p>
                                        <p>Created At: {diagnosis.createdAt}</p>
                                        {/* Render other allergy properties as needed */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Display a message if no allergies are available */}
                    {diagnosis && diagnosis.length === 0 && (
                        <div>
                            <p>No Diagnoses found for this patient.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
