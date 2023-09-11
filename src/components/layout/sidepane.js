import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faCommentMedical,
    faFileMedical,
    faHandDots,
    faHome,
    faPrescriptionBottle, faRightFromBracket, faUser
} from '@fortawesome/free-solid-svg-icons';

function SidePane() {

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


    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ borderRight: '2px solid #171717'}}>
            <div className="d-flex flex-column">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <h4 className="mt-5" style={{color: '#454a57', letterSpacing: '1px', fontWeight: '700', fontSize:'13px', marginBottom: '15px'}}>
                        MENU
                    </h4>

                    <li className="nav-item">
                        <a className="nav-link align-middle px-0 text-light">
                            <FontAwesomeIcon icon={faHome}/> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                    </li>
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
                        <a className="nav-link px-0 align-middle text-light">
                            <FontAwesomeIcon icon={faUser}/> <span className="ms-2 d-none d-sm-inline">My Profile</span>
                        </a>
                    </li>

                    <li>
                        <a className="nav-link px-0 align-middle text-light">
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