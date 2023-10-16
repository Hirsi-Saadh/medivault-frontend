import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { useLaboratoryData } from './laboratoryUtils';
import Sidepane from '../components/layout/sidepane';

export default function LaboratoryDashboard() {
    const laboratory = useAuth(); // Use the useAuth hook to get the authenticated user
    const { userType, username, email, LaboratoryName, LaboratoryAddress, LaboratoryLicense, LaboratoryType, MedicalLicenseBlob } = useLaboratoryData(laboratory);

    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        // You can use the userType, email, and username here
        console.log('user type:', userType);
        console.log('username:', username);
        console.log('email:', email)
        console.log('Name:', LaboratoryName);
        console.log('Type:', LaboratoryType);
        console.log('License:', LaboratoryLicense);
        console.log('Address:', LaboratoryAddress);
        console.log('Image:', MedicalLicenseBlob);

        // Assume your useLaboratoryData function fetches data asynchronously
        // You can set isLoading to false when the data has been loaded
        setIsLoading(false);
    }, [userType, email, username, LaboratoryName, LaboratoryAddress, LaboratoryLicense, LaboratoryType, MedicalLicenseBlob]);

    // image base64 to png
    const license_img_url = `data:image/jpeg;base64,${MedicalLicenseBlob}`;

    return (
        <div className="d-flex" style={{ maxHeight: '80vh' }}>
            <Sidepane />
            <div className="container" >
                {isLoading ? (
                    <div className="text-light">Loading...</div>
                ) : (
                    <div className="mt-3 ms-4 pt-3 container d-flex" >
                        <h4 className="pt-3 text-light">Welcome back {username}, </h4>
                        <img src={license_img_url} alt="Binary" width='140px' />
                    </div>
                )}
            </div>
        </div>
    );
}
