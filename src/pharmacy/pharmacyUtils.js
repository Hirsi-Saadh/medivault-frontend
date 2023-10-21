import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../firebase";
import {useUserData} from "../users/userUtils";
import springApiUrl from "../springConfig";

export function usePharmacyData(pharmacy) {

    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [PharmacyName, setPharmacyName] = useState('');
    const [PharmacyAddress, setPharmacyAddress] = useState('');
    const [PharmacyLicense, setPharmacyLicense] = useState('');
    const [PharmacyType, setPharmacyType] = useState('');
    const [PharmacyLicenseBlob, setPharmacyLicenseBlob] = useState('');

    useEffect(() => {
        if (pharmacy) {
            const fetchData = async () => {
                try {
                    const uid = pharmacy.uid;
                    console.log({uid})
                    const pharmacyTypeResponse = await axios.get(`${springApiUrl}/pharmacy/info?uid=${uid}`);

                    if (pharmacyTypeResponse.status === 200) {
                        const pharmacyData = pharmacyTypeResponse.data;
                        setPharmacyName(pharmacyData.pharmacyName);
                        setPharmacyAddress(pharmacyData.pharmacyAddress);
                        setPharmacyLicense(pharmacyData.pharmacyLicense);
                        setPharmacyType(pharmacyData.pharmacyType);
                        setPharmacyLicenseBlob(pharmacyData.pharmacyLicenseBlob);
                    } else {
                        console.error('Pharmacy not found in MySQL.');
                    }
                } catch (error) {
                    console.error('Error fetching pharmacy data:', error);
                }
            };

            fetchData();
        }
    }, [pharmacy]);

    return { userType, username, email, PharmacyName, PharmacyAddress, PharmacyLicense, PharmacyType, PharmacyLicenseBlob };
}
