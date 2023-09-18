import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../firebase'; // Replace with your Firebase authentication hook
import { useUserData } from '../users/userUtils';
import springApiUrl from "../springConfig";

export function useDoctorData(doctor) {
    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [DoctorFirstName, setDoctorFirstName] = useState('');
    const [DoctorLastName, setDoctorLastName] = useState('');
    const [DoctorAddress, setDoctorAddress] = useState('');
    const [DoctorLicense, setDoctorLicense] = useState('');
    const [DoctorType, setDoctorType] = useState('');
    const [DoctorSpecialization, setDoctorSpecialization] = useState('');
    const [DoctorImageBlob, setDoctorImageBlob] = useState('');
    const [DoctorImageBase64, setDoctorImageBase64] = useState('');
    const [DoctorLicenseBlob, setDoctorLicenseBlob] = useState('');
    const [DoctorLicenseBase64, setDoctorLicenseBase64] = useState('');

    useEffect(() => {
        if (doctor) {
            const fetchData = async () => {
                try {
                    const uid = doctor.uid;
                    console.log({ uid });
                    const doctorTypeResponse = await axios.get(`${springApiUrl}/doctor/info?uid=${uid}`);

                    if (doctorTypeResponse.status === 200) {
                        const doctorData = doctorTypeResponse.data;
                        setDoctorFirstName(doctorData.doctorFirstName);
                        setDoctorLastName(doctorData.doctorLastName);
                        setDoctorAddress(doctorData.doctorAddress);
                        setDoctorLicense(doctorData.doctorLicense);
                        setDoctorType(doctorData.doctorType);
                        setDoctorSpecialization(doctorData.doctorSpecialization);
                        setDoctorImageBlob(doctorData.doctorImageBlob);
                        setDoctorImageBase64(doctorData.doctorImageBase64);
                        setDoctorLicenseBlob(doctorData.doctorLicenseBlob);
                        setDoctorLicenseBase64(doctorData.doctorLicenseBase64);
                    } else {
                        console.error('Doctor not found in MySQL.');
                    }
                } catch (error) {
                    console.error('Error fetching doctor data:', error);
                }
            };

            fetchData();
        }
    }, [doctor]);

    return {
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
    };
}
