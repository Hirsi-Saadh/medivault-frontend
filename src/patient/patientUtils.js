import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from "../firebase";
import {useUserData} from "../users/userUtils";

export function usePatientData(patient) {

    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Age, setAge] = useState('');
    const [Address, setAddress] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        if (patient) {
            const fetchData = async () => {
                try {
                    const uid = patient.uid;
                    console.log({uid})
                    const patientTypeResponse = await axios.get(`http://localhost:8080/patients/info?uid=${uid}`);

                    if (patientTypeResponse.status === 200) {
                        const patientData = patientTypeResponse.data;
                        setFirstName(patientData.firstName);
                        setLastName(patientData.lastName);
                        setAge(patientData.age);
                        setAddress(patientData.address);
                        setDateOfBirth(patientData.dateOfBirth);
                    } else {
                        console.error('User not found in MySQL.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchData();
        }
    }, [patient]);

    return { userType, username, email, FirstName, LastName, Age, Address, DateOfBirth };
}