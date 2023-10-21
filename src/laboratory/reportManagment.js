import React, { useState, useEffect } from 'react';
import Sidepane from '../components/layout/sidepane';
import { useAuth } from '../firebase';
import { useUserData } from '../users/userUtils';
import springApiUrl from '../springConfig';
import Modal from 'react-modal';

const ReportManagement = () => {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState('');
    const [loading, setLoading] = useState(true);
    const [noReports, setNoReports] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportName, setReportName] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const user = useAuth();
    const userUid = user ? user.uid : null;

    // Retrieve patient details from the session
    const storedPatientData = sessionStorage.getItem('patientData');
    const patientData = JSON.parse(storedPatientData || '{}');

    // Extract patient details from the session
    const { Uid, FirstName, LastName, Age, Address, bloodGroup } = patientData;

    const handleAddReport = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setReportName('');
        setPdfFile(null);
    };

    const handleReportNameChange = (e) => {
        setReportName(e.target.value);
    };

    const handlePdfFileChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    const handleReportSubmission = () => {
        const medicalReport = {
            reportName: reportName,
            reportStatus: 'Report Received',
            patientUid: Uid,
            laboratoryUid: userUid,
        };

        const reportData = new FormData();
        reportData.append('medicalReport', JSON.stringify(medicalReport));
        reportData.append('pdfFile', pdfFile);

        const headers = new Headers();

        setUploading(true);

        fetch(`${springApiUrl}/medical-reports/add`, {
            method: 'POST',
            headers: headers,
            body: reportData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error creating medical report. Status: ${response.status}`);
                }
            })
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => {
                // Set the loading state back to false, whether successful or not
                setUploading(false);
                fetchMedicalReports();
                closeModal();
            });
    };

    const fetchMedicalReports = () => {
        fetch(`${springApiUrl}/medical-reports/by-patient-and-laboratory?patientUid=${Uid}&laboratoryUid=${userUid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error fetching medical reports. Status: ${response.status}`);
                }
            })
            .then((data) => {
                setLoading(false);
                if (data.length > 0) {
                    setReports(data);
                } else {
                    setNoReports(true);
                }
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
                setNoReports(true);
            });
    };

    useEffect(() => {
        if (userUid) {
            fetchMedicalReports();
        }
    }, [userUid]);

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container">
                <div className="mt-3 ms-4 pt-3 container">
                    <h2 className="mb-4">Medical Reports</h2>
                    <hr className="mt-4" />

                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                        <h3>Existing Reports</h3>
                        <div>
                            <button className="btn btn-danger" onClick={handleAddReport}>
                                Add Report
                            </button>
                            <button className="btn btn-success ms-2" onClick={fetchMedicalReports}>
                                Load Reports
                            </button>
                        </div>
                    </div>

                    <div className="bg-dark rounded-2 mt-2 p-2">
                        <div className="container" style={{ maxWidth: '50%' }}>
                            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                <p style={{ textTransform: 'capitalize' }}>
                                    Name: <strong>{FirstName} {LastName}</strong>
                                </p>
                                <p>Age: <strong>{Age}</strong></p>
                            </div>
                            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                <p>Address: <strong>{Address}</strong></p>
                                <p>Blood: <strong>{bloodGroup}</strong></p>
                            </div>
                        </div>
                    </div>

                    {loading && <p>Loading...</p>}

                    {noReports ? (
                        <p>No medical reports available</p>
                    ) : (
                        <ul className="list-group mt-2">
                            {reports.map((report, index) => (
                                <li key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                    style={{
                                        backgroundColor: '#171717',
                                        marginBottom: '10px',
                                        border: 'none',
                                        color: '#fff', // Light text color
                                        height: 'auto', // Increased height
                                        transition: 'background-color 0.2s', // Hover effect
                                    }}>
                                    {report.reportName}
                                    {report.pdfFile && (
                                        <a
                                            href={`data:application/pdf;base64,${btoa(report.pdfFile)}`}
                                            download={`${report.reportName}.pdf`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Download PDF
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Add Report Modal"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                width: '40%',
                                margin: 'auto',
                                height:'300px',
                                padding: '50px',
                                borderRadius: '8px',
                                backgroundColor: '#191919',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        <div className="container d-block text-center">
                            <h3 className="text-light">Add Report</h3>

                            <div className="container">
                                <input
                                    type="text"
                                    placeholder="Report Name"
                                    value={reportName}
                                    onChange={handleReportNameChange}
                                    className="form-control"
                                />
                                <input
                                    type="file"
                                    onChange={handlePdfFileChange}
                                    className="form-control mt-2"
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                                <button className="btn btn-outline-danger" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button className="btn btn-success ms-2" onClick={handleReportSubmission}>
                                    Save
                                </button>
                            </div>

                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ReportManagement;
