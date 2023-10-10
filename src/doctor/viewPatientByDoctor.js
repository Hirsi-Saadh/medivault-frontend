import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import Sidepane from '../components/layout/sidepane';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllergyData } from '../patient/allergyUtils';
import {useDiagnosisData} from "../patient/diagnosisUtils";
import AddPrescription from "./addPrescription";
import PrescribeMedicalReport from "./addMedicalReportPrescription"; // Import the useAllergyData hook
import NewDiagnosis from "../patient/newDiagnosis";
import DoctorNewDiagnosis from "./DoctorNewDiagnosis";
import ViewPatientChannelingHistory from "./viewPatientChannelingHistory";

export default function ViewPatientByDoctor() {
    const user = useAuth(); // Use the useAuth hook to get the authenticated user
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const uidFromQuery = params.get('patient_uid');
    const navigate = useNavigate();
    console.log('UID from query:', uidFromQuery);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                <div className="mt-3 ms-4 pt-3 container d-block">
                        <div>
                            <h2>Patient Information</h2>

                            <div className=''>
                                <div style={{width:'auto'}}>
                                    {patientData ? (
                                        <>
                                            <div className='container p-4'>
                                                <div className='container d-flex'>
                                                    <div className='container p-3' style={{textAlign:'left', width:'350px', borderRadius:'25px 25px 25px 25px', backgroundColor:'#171717'}}>
                                                        <p >First Name: {patientData.FirstName}</p>
                                                        <p >Last Name: {patientData.LastName}</p>
                                                        <p >Age: {patientData.Age}</p>
                                                        <p >Address: {patientData.Address}</p>
                                                        <p >Date of Birth: {patientData.DateOfBirth}</p>
                                                    </div>
                                                        <AddPrescription/>
                                                    <div>

                                                    </div>
                                                </div>

                                        <div className='container d-flex mt-3 p-3' >

                                            <div>
                                            {/* Display list of allergies */}
                                            {allergies && allergies.length > 0 && (
                                                <div className='p-4' style={{textAlign:'left', width:'350px', borderRadius:'25px 25px 25px 25px', backgroundColor:'#171717'}}>
                                                    <h4>Allergies</h4>
                                                    <div  style={{ overflowX: 'hidden', overflowY: 'auto', height: '250px', scrollbarWidth: 'thin', scrollbarColor: 'darkgray lightgray' }}>
                                                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                            {allergies.map((allergy, index) => (
                                                                <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid lightgray' , borderRadius:'25px 25px 25px 25px' }}>
                                                                    <p>Allergy Name: {allergy.allergyName}</p>
                                                                    <p>Description: {allergy.allergyDescription}</p>
                                                                    <p>Created At: {allergy.createdAt}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Display a message if no allergies are available */}
                                            {allergies && allergies.length === 0 && (
                                                <div>
                                                    <p>No allergies found for this patient.</p>
                                                </div>
                                            )}

                                            </div>

                                            <ViewPatientChannelingHistory/>

                                            <div>
                                                    {/* Display list of diagnosis */}
                                                    {diagnosis && diagnosis.length > 0 && (
                                                        <div className='p-4 ms-2' style={{textAlign:'left', width:'350px', borderRadius:'25px 25px 25px 25px', backgroundColor:'#171717'}}>
                                                            <h4>Diagnosis</h4>
                                                            <button onClick={openModal}>Add Diagnosis</button>
                                                            <div style={{ overflowX: 'hidden', overflowY: 'auto', height: '250px', scrollbarWidth: 'thin', scrollbarColor: 'darkgray lightgray' }}>
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
                                                        </div>
                                                    )}

                                                    {/* Display a message if no allergies are available */}
                                                    {diagnosis && diagnosis.length === 0 && (
                                                        <div>
                                                            <p>No Diagnoses found for this patient.</p>
                                                        </div>
                                                    )}

                                                {/* Modal */}
                                                {isModalOpen && (
                                                    <div className="modal" style={modalStyle}>
                                                        <div className="modal-content" style={modalContentStyle}>
                                                            <span className="close" style={closeButtonStyle} onClick={closeModal}>&times;</span>
                                                            {/* Render your newDiagnosis component */}
                                                            <DoctorNewDiagnosis/>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                         </div>
                                        </div>
                                        </>
                                    ) : (
                                        <p>Loading patient information...</p>
                                    )}
                                </div>
                            </div>



                        </div>

                </div>
            </div>
        </div>
    );


}
