import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { usePharmacyData } from './pharmacyUtils';
import Sidepane from '../components/layout/sidepane';

export default function PharmacyDashboard() {
    const pharmacy = useAuth(); // Use the useAuth hook to get the authenticated user
    const { userType, username, email, PharmacyName, PharmacyAddress, PharmacyLicense, PharmacyType, PharmacyLicenseBlob } = usePharmacyData(pharmacy);

    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        // You can use the userType, email, and username here
        console.log('user type:', userType);
        console.log('username:', username);
        console.log('email:', email)
        console.log('Name:', PharmacyName);
        console.log('Type:', PharmacyType);
        console.log('License:', PharmacyLicense);
        console.log('Address:', PharmacyAddress);
        console.log('Image:', PharmacyLicenseBlob);

        // Assume your usePharmacyData function fetches data asynchronously
        // You can set isLoading to false when the data has been loaded
        setIsLoading(false);
    }, [userType, email, username, PharmacyName, PharmacyAddress, PharmacyLicense, PharmacyType, PharmacyLicenseBlob]);

    // image base64 to png
    const license_img_url = `data:image/jpeg;base64,${PharmacyLicenseBlob}`;

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
