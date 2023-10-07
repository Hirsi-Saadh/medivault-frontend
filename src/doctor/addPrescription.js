import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { useNavigate } from 'react-router-dom';
import springApiUrl from '../springConfig';

export default function AddPrescription() {
    const navigate = useNavigate();
    const doctor = useAuth(); // Replace with your Firebase authentication hook

    const [patientData, setPatientData] = useState(null);

    useEffect(() => {
        // Retrieve patient data from session storage
        const storedPatientData = sessionStorage.getItem('patientData');
        if (storedPatientData) {
            const parsedPatientData = JSON.parse(storedPatientData);
            setPatientData(parsedPatientData);
        }
    }, []);

    const doctorUid = doctor ? doctor.uid : ''; // Check if doctor is defined
    const patientUid = patientData ? patientData.Uid : ''; // Check if patientData is defined

    console.log('Doctor Uid:' + doctorUid);
    console.log('Patient Uid:' + patientUid);

    // Define state variables for prescription data
    const [prescriptions, setPrescriptions] = useState([
        {
            doctorUid: '',
            patientUid: '',
            medicationName: '',
            dosage: '',
            medicationType: '',
        },
    ]);

    useEffect(() => {
        // Update prescription objects with the latest doctorUid and patientUid
        const updatedPrescriptions = prescriptions.map(prescription => ({
            ...prescription,
            doctorUid: doctorUid,
            patientUid: patientUid,
        }));
        setPrescriptions(updatedPrescriptions);
    }, [doctorUid, patientUid]);

    const handleAddPrescription = () => {
        const newPrescription = {
            doctorUid: doctorUid,
            patientUid: patientUid,
            medicationName: '',
            dosage: '',
            medicationType: '',
        };

        console.log('Adding Prescription:', newPrescription);
        setPrescriptions([...prescriptions, newPrescription]);
    };



    const handleRemovePrescription = (index) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions.splice(index, 1);
        setPrescriptions(updatedPrescriptions);
    };

    const handlePrescriptionInputChange = (index, field, value) => {
        const updatedPrescriptions = [...prescriptions];
        updatedPrescriptions[index][field] = value;
        setPrescriptions(updatedPrescriptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate prescription data here
        console.log('Prescription Data to Send:', prescriptions);
        // Send the prescription data to the backend
        try {
            const response = await fetch(`${springApiUrl}/prescriptions/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prescriptions),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message and clear the form
                console.log('Prescriptions added successfully');
                // Clear the form
                setPrescriptions([
                    {
                        doctorUid: doctorUid,
                        patientUid: patientUid,
                        medicationName: '',
                        dosage: '',
                        medicationType: '',
                    },
                ]);
                // Redirect or perform any necessary action
                navigate('/dashboard'); // Example: Redirect to the dashboard
            } else {
                // Handle the case where the request to the backend failed
                console.error('Failed to add prescriptions');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container p-4" style={{ textAlign: 'left', width: 'auto', borderRadius: '25px 25px 25px 25px', backgroundColor: '#171717' }}>
            <h4>Prescription</h4>
            <div className='d-flex flex-column'>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {/* Prescription input fields */}
                    {prescriptions.map((prescription, index) => (
                        <div key={index} className="row mb-3">
                            <div className="col-6">
                                <label htmlFor={`medicationName-${index}`} className="form-label">
                                    Medication Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`medicationName-${index}`}
                                    name={`medicationName-${index}`}
                                    value={prescription.medicationName}
                                    onChange={(e) =>
                                        handlePrescriptionInputChange(index, 'medicationName', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor={`dosage-${index}`} className="form-label">
                                    Dosage
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`dosage-${index}`}
                                    name={`dosage-${index}`}
                                    value={prescription.dosage}
                                    onChange={(e) =>
                                        handlePrescriptionInputChange(index, 'dosage', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor={`medicationType-${index}`} className="form-label">
                                    Medication Type
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`medicationType-${index}`}
                                    name={`medicationType-${index}`}
                                    value={prescription.medicationType}
                                    onChange={(e) =>
                                        handlePrescriptionInputChange(index, 'medicationType', e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <button
                                    type="button"
                                    onClick={() => handleRemovePrescription(index)}
                                    className="btn btn-danger mt-4"
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='d-flex'>
                        <div className="">
                            <div className="col-12">
                                <button type="button" onClick={handleAddPrescription} className="btn btn-primary">
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary mt-3">
                                    Save Prescriptions
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
