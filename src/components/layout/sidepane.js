import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faCommentMedical,
    faFileMedical,
    faHandDots,
    faHome,
    faPrescriptionBottle, faQrcode, faRightFromBracket, faUser, faUserDoctor
} from '@fortawesome/free-solid-svg-icons';
import {auth, useAuth} from "../../firebase";
import {useNavigate} from 'react-router-dom'
import {useUserData} from "../../users/userUtils";

function SidePane() {

    const navigate = useNavigate();
    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, isLoading } = useUserData(user);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const [isSubMenu1Collapsed, setIsSubMenu1Collapsed] = useState(true);
    const [isSubMenu2Collapsed, setIsSubMenu2Collapsed] = useState(true);
    const [isSubMenu3Collapsed, setIsSubMenu3Collapsed] = useState(true);
    const [isSubMenu4Collapsed, setIsSubMenu4Collapsed] = useState(true);
    const toggleSubMenu1 = () => {
        setIsSubMenu1Collapsed(!isSubMenu1Collapsed);
    };

    const toggleSubMenu2 = () => {
        setIsSubMenu2Collapsed(!isSubMenu2Collapsed);
    };

    const toggleSubMenu3 = () => {
        setIsSubMenu3Collapsed(!isSubMenu3Collapsed);
    };

    const toggleSubMenu4 = () => {
        setIsSubMenu4Collapsed(!isSubMenu4Collapsed);
    };

    //dashboard link
    const dashboardLink = `/${userType}/dashboard`;
    //profile link
    const profileLink = `/${userType}/profile`;

    //Hospital
    //add doctor
    const addDoctorLink = '/hospital/doctor/register'
    const viewDoctorLink = '/hospital/doctor/list'

    //Patient
    //qr
    const qrViewLink = '/patient/view/qr'
    //allergy
    const addAllergyLink ='/patient/allergy/new'
    const viewAllergyLink ='/patient/allergy/view'
    //diagnosis
    const addDiagnosisLink = '/patient/diagnosis/new'
    const viewDiagnosisLink = '/patient/diagnosis/view'
    //prescription
    const viewPrescription = '/patient/prescriptions/view'
    const viewPrescriptionHistory = '/patient/prescriptions/view-history'


    //Doctor
    //qr
    const qrScanLink = '/doctor/scan/qr'


    if (isLoading) {
        // Display a loading indicator or message
        return <div>Loading...</div>;
    }

    if (!userType) {
        // Handle the case when userType is not available
        return <div>User data not available.</div>;
    }

    // patient menu
    const patientMenu = userType.toLowerCase() === 'patient' ? (
        <>
        <li>
            <a
                href="#"
                onClick={toggleSubMenu1}
                className="nav-link px-0 align-middle text-light"
            >
                <FontAwesomeIcon icon={faPrescriptionBottle}/> <span className="ms-2 d-none d-sm-inline">Prescriptions</span>
            </a>
            <ul
                className={`collapse ${isSubMenu1Collapsed ? "" : "show"} nav flex-column ms-1`}
                id="submenu1"
                data-bs-parent="#menu"
            >
                <li className="w-100">
                    <a className="nav-link px-0 text-light" href={viewPrescription}>
                        <span className="d-none d-sm-inline">&nbsp;&nbsp;View</span>
                    </a>
                </li>
                <li className="w-100">
                    <a className="nav-link px-0 text-light" href={viewPrescriptionHistory}>
                        <span className="d-none d-sm-inline">&nbsp;&nbsp;History</span>
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <a
                href="#"
                onClick={toggleSubMenu2}
                className="nav-link px-0 align-middle text-light"
            >
                <FontAwesomeIcon icon={faHandDots}/> <span className="ms-1 d-none d-sm-inline">Allergies</span>
            </a>
            <ul
                className={`collapse ${isSubMenu2Collapsed ? "" : "show"} nav flex-column ms-1`}
                id="submenu2"
                data-bs-parent="#menu"
            >
                <li className="w-100">
                    <a className="nav-link px-0 text-light" href={viewAllergyLink}>
                        <span className="d-none d-sm-inline">&nbsp;&nbsp;View</span>
                    </a>
                </li>
                <li>
                    <a className="nav-link px-0 text-light" href={addAllergyLink}>
                        <span className="d-none d-sm-inline">&nbsp;&nbsp;Add</span>
                    </a>
                </li>
            </ul>
        </li>

        <li>
            <a
                href="#"
                onClick={toggleSubMenu3}
                className="nav-link px-0 align-middle text-light"
            >
                <FontAwesomeIcon icon={faCommentMedical}/> <span className="ms-1 d-none d-sm-inline">Diagnoses</span>
            </a>
            <ul
                className={`collapse ${isSubMenu3Collapsed ? "" : "show"} nav flex-column ms-1`}
                id="submenu3"
                data-bs-parent="#menu"
            >
                <li className="w-100">
                    <a className="nav-link px-0 text-light" href={viewDiagnosisLink}>
                        <span className="d-none d-sm-inline">&nbsp;&nbsp;View</span>
                    </a>
                </li>
                <li>
                    <a className="nav-link px-0 text-light" href={addDiagnosisLink}>
                        <span className="d-none d-sm-inline">&nbsp;&nbsp;Add</span>
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <a className="nav-link px-0 align-middle text-light" href={qrViewLink}>
                <FontAwesomeIcon icon={faQrcode}/> <span className="ms-2 d-none d-sm-inline">View QR</span>
            </a>
        </li>
        </>
    ) : null;

    // hospital
    const hospitalMenu = userType.toLowerCase() === 'hospital' ? (

        <>
            <li>
                <a
                    href="#"
                    onClick={toggleSubMenu1}
                    className="nav-link px-0 align-middle text-light"
                >
                    <FontAwesomeIcon icon={faUserDoctor}/> <span className="ms-2 d-none d-sm-inline">Doctors</span>
                </a>
                <ul
                    className={`collapse ${isSubMenu1Collapsed ? "" : "show"} nav flex-column ms-1`}
                    id="submenu1"
                    data-bs-parent="#menu"
                >
                    <li className="w-100">
                        <a className="nav-link px-0 text-light" href={viewDoctorLink}>
                            <span className="d-none d-sm-inline">&nbsp;&nbsp;View</span>
                        </a>
                    </li>
                    <li>
                        <a className="nav-link px-0 text-light" href={addDoctorLink}>
                            <span className="d-none d-sm-inline">&nbsp;&nbsp;Add</span>
                        </a>
                    </li>
                </ul>
            </li>
            </>

    ) : null;

    // doctor
    const doctorMenu = userType.toLowerCase() === 'doctor' ? (

        <>
            <li>
                <a className="nav-link px-0 align-middle text-light" href={qrScanLink}>
                    <FontAwesomeIcon icon={faQrcode}/> <span className="ms-2 d-none d-sm-inline">Scan QR</span>
                </a>
            </li>
        </>

    ) : null;

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ borderRight: '2px solid #171717'}}>
            <div className="d-flex flex-column">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <h4 className="mt-5" style={{color: '#454a57', letterSpacing: '1px', fontWeight: '700', fontSize:'13px', marginBottom: '15px'}}>
                        MENU
                    </h4>

                    <li className="nav-item">
                        <a className="nav-link align-middle px-0 text-light" href={dashboardLink}>
                            <FontAwesomeIcon icon={faHome}/> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                    </li>
                    {patientMenu}
                    {hospitalMenu}
                    {doctorMenu}

                    <li>
                        <a
                            href="#"
                            onClick={toggleSubMenu4}
                            className="nav-link px-0 align-middle text-light"
                        >
                            <FontAwesomeIcon icon={faFileMedical}/> <span className="ms-2 d-none d-sm-inline">Reports</span>
                        </a>
                        <ul
                            className={`collapse ${isSubMenu4Collapsed ? "" : "show"} nav flex-column ms-1`}
                            id="submenu3"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <a className="nav-link px-0 text-light">
                                    <span className="d-none d-sm-inline">&nbsp;&nbsp;View</span>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link px-0 text-light">
                                    <span className="d-none d-sm-inline">&nbsp;&nbsp;Add</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <br/>
                    <h4 style={{color: '#454a57', letterSpacing: '1px', fontWeight: '700', fontSize:'13px', marginBottom: '15px'}}>
                        EXTRAS
                    </h4>

                    <li>
                        <a className="nav-link px-0 align-middle text-light">
                            <FontAwesomeIcon icon={faCircleInfo}/> <span className="ms-2 d-none d-sm-inline">Support</span>
                        </a>
                    </li>

                    <br/>
                    <h4 style={{color: '#454a57', letterSpacing: '1px', fontWeight: '700', fontSize:'13px', marginBottom: '15px'}}>
                        GENERAL
                    </h4>

                    <li>
                        <a className="nav-link px-0 align-middle text-light" href={profileLink}>
                            <FontAwesomeIcon icon={faUser}/> <span className="ms-2 d-none d-sm-inline">My Profile</span>
                        </a>
                    </li>

                    <li>
                        <a className="nav-link px-0 align-middle text-light" href='#' onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket}/> <span className="ms-2 d-none d-sm-inline">Logout</span>
                        </a>
                    </li>

                </ul>
                <hr />
            </div>
        </div>
    );
}

export default SidePane;
