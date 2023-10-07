import React, { useState } from 'react';
import { useAuth } from '../firebase';
import Sidepane from '../components/layout/sidepane';
import { useNavigate } from 'react-router-dom';
import springApiUrl from '../springConfig';

export default function PrescribeMedicalReport() {
    const navigate = useNavigate();
    const user = useAuth();

    const [medicalReports, setMedicalReports] = useState([
        { reportName: '' },
    ]);

    const handleInputChange = (index, value) => {
        const updatedReports = [...medicalReports];
        updatedReports[index].reportName = value;
        setMedicalReports(updatedReports);
    };

    const addReport = () => {
        setMedicalReports([...medicalReports, { reportName: '' }]);
    };

    const removeReport = (index) => {
        const updatedReports = [...medicalReports];
        updatedReports.splice(index, 1);
        setMedicalReports(updatedReports);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate medical report data here

        try {
            const response = await fetch(`${springApiUrl}/medical-reports/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(medicalReports),
            });

            if (response.ok) {
                console.log('Medical reports added successfully');
                setMedicalReports([{ reportName: '' }]);
                navigate('/dashboard');
            } else {
                console.error('Failed to add medical reports');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container ms-2 p-4" style={{ textAlign: 'left', width: 'auto', borderRadius: '25px 25px 25px 25px', backgroundColor: '#171717' }}>
            <h4>Prescribe Medical Reports</h4>
            <div className='d-flex flex-column'>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    {/* Dynamic Fields */}
                    {medicalReports.map((report, index) => (
                        <div className="row mb-3" key={index}>
                            <div className="col-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Report Name"
                                    value={report.reportName}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            </div>
                            <div className="col-2">
                                {index === 0 ? (
                                    <button type="button" className="btn btn-success" onClick={addReport}>+</button>
                                ) : (
                                    <button type="button" className="btn btn-danger" onClick={() => removeReport(index)}>-</button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className="row mb-3">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Save Medical Reports
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
