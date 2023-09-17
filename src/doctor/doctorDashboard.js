import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { useDoctorData } from './doctorUtils';
import Sidepane from '../components/layout/sidepane';

export default function DoctorDashboard() {
    const doctor = useAuth(); // Use the useAuth hook to get the authenticated user
    const { userType,
        username,
        email,
        DoctorFirstName,
        DoctorLastName,
        DoctorAddress,
        DoctorLicense,
        DoctorType,
        DoctorSpecialization,
        DoctorImageBlob,
        DoctorImageBase64,
        DoctorLicenseBlob,
        DoctorLicenseBase64, } = useDoctorData(doctor);

    useEffect(() => {
        // You can use the userType, email, and username here
        console.log('user type:', userType);
        console.log('username:', username);
        console.log('email:', email);
        console.log('First Name:', DoctorFirstName);
        console.log('Last Name:', DoctorLastName);
        console.log('Type:', DoctorType);
        console.log('License:', DoctorLicense);
        console.log('Address:', DoctorAddress);
        console.log('Specialization:', DoctorSpecialization);
    }, [
        userType,
        username,
        email,
        DoctorFirstName,
        DoctorLastName,
        DoctorAddress,
        DoctorLicense,
        DoctorType,
        DoctorSpecialization,
        DoctorImageBlob,
        DoctorImageBase64,
        DoctorLicenseBlob,
        DoctorLicenseBase64,
    ]);

    // image base64 to png
    const profile_img_url = `data:image/jpeg;base64,${DoctorImageBlob}`;
    const license_img_url = `data:image/jpeg;base64,${DoctorLicenseBlob}`;



    return (
        <div className="d-flex" style={{maxHeight: '80vh'}}>
            <Sidepane />
            <div className="container" >
                <div className="mt-3 ms-4 pt-3 container d-flex" >
                    <h4 className="pt-3 text-light">Welcome back {username}, </h4>
                    <img src={license_img_url} alt="Binary" width='140px' />
                    <img src={profile_img_url} alt="Binary" width='140px' />
                </div>

            </div>
        </div>
    );
}
