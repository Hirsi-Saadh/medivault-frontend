import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../firebase";
import {useUserData} from "../users/userUtils";
import springApiUrl from "../springConfig";

export function useHospitalData(hospital) {

    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [HospitalName, setHospitalName] = useState('');
    const [HospitalAddress, setHospitalAddress] = useState('');
    const [HospitalLicense, setHospitalLicense] = useState('');
    const [HospitalType, setHospitalType] = useState('');
    const [MedicalLicenseBlob, setMedicalLicenseBlob] = useState('');

    useEffect(() => {
        if (hospital) {
            const fetchData = async () => {
                try {
                    const uid = hospital.uid;
                    console.log({uid})
                    const hospitalTypeResponse = await axios.get(`${springApiUrl}/hospital/info?uid=${uid}`);

                    if (hospitalTypeResponse.status === 200) {
                        const hospitalData = hospitalTypeResponse.data;
                        setHospitalName(hospitalData.hospitalName);
                        setHospitalAddress(hospitalData.hospitalAddress);
                        setHospitalLicense(hospitalData.hospitalLicense);
                        setHospitalType(hospitalData.hospitalType);
                        setMedicalLicenseBlob(hospitalData.medicalLicenseBlob);
                    } else {
                        console.error('Hospital not found in MySQL.');
                    }
                } catch (error) {
                    console.error('Error fetching hospital data:', error);
                }
            };

            fetchData();
        }
    }, [hospital]);

    return { userType, username, email, HospitalName, HospitalAddress, HospitalLicense, HospitalType, MedicalLicenseBlob };
}
