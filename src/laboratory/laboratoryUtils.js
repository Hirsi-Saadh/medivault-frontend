import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../firebase";
import {useUserData} from "../users/userUtils";
import springApiUrl from "../springConfig";

export function useLaboratoryData(laboratory) {

    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [LaboratoryName, setLaboratoryName] = useState('');
    const [LaboratoryAddress, setLaboratoryAddress] = useState('');
    const [LaboratoryLicense, setLaboratoryLicense] = useState('');
    const [LaboratoryType, setLaboratoryType] = useState('');
    const [MedicalLicenseBlob, setMedicalLicenseBlob] = useState('');

    useEffect(() => {
        if (laboratory) {
            const fetchData = async () => {
                try {
                    const uid = laboratory.uid;
                    console.log({uid})
                    const laboratoryTypeResponse = await axios.get(`${springApiUrl}/laboratory/info?uid=${uid}`);

                    if (laboratoryTypeResponse.status === 200) {
                        const laboratoryData = laboratoryTypeResponse.data;
                        setLaboratoryName(laboratoryData.laboratoryName);
                        setLaboratoryAddress(laboratoryData.laboratoryAddress);
                        setLaboratoryLicense(laboratoryData.laboratoryLicense);
                        setLaboratoryType(laboratoryData.laboratoryType);
                        setMedicalLicenseBlob(laboratoryData.medicalLicenseBlob);
                    } else {
                        console.error('Laboratory not found in MySQL.');
                    }
                } catch (error) {
                    console.error('Error fetching laboratory data:', error);
                }
            };

            fetchData();
        }
    }, [laboratory]);

    return { userType, username, email, LaboratoryName, LaboratoryAddress, LaboratoryLicense, LaboratoryType, MedicalLicenseBlob };
}
