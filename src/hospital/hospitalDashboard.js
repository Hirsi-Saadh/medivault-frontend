import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { useHospitalData } from './hospitalUtils';
import Sidepane from '../components/layout/sidepane';

export default function HospitalDashboard() {
    const hospital = useAuth(); // Use the useAuth hook to get the authenticated user
    const { userType, username, email, HospitalName, HospitalAddress, HospitalLicense, HospitalType, MedicalLicenseBlob } = useHospitalData(hospital);

    useEffect(() => {
        // You can use the userType, email, and username here
        console.log('user type:', userType);
        console.log('username:', username);
        console.log('email:', email)
        console.log('Name:', HospitalName);
        console.log('Type:', HospitalType);
        console.log('License:', HospitalLicense);
        console.log('Address:', HospitalAddress);
        console.log('Image:', MedicalLicenseBlob);
    }, [userType, email, username, HospitalName, HospitalAddress, HospitalLicense, HospitalType, MedicalLicenseBlob]);

    // image base64 to png
    const license_img_url = `data:image/jpeg;base64,${MedicalLicenseBlob}`;



    return (
        <div className="d-flex" style={{maxHeight: '80vh'}}>
            <Sidepane />
            <div className="container" >
                <div className="mt-3 ms-4 pt-3 container d-flex" >
                    <h4 className="pt-3 text-light">Welcome back {username}, </h4>
                    <img src={license_img_url} alt="Binary" width='140px' />
                </div>

            </div>
        </div>
    );
}
