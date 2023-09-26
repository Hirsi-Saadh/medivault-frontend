import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../firebase';
import { useUserData } from '../users/userUtils';
import springApiUrl from "../springConfig";

export function useDiagnosisData(initialUid = null) {
    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [uid, setUid] = useState(initialUid);
    const [diagnosis, setDiagnosis] = useState([]);

    useEffect(() => {
        if (initialUid) {
            // If an initial uid is provided, set it as the current uid
            setUid(initialUid);
        }
    }, [initialUid]);

    useEffect(() => {
        if (uid) {
            const fetchDiagnosis = async () => {
                try {
                    const response = await axios.get(`${springApiUrl}/patients/diagnosis/all?uid=${uid}`);

                    if (response.status === 200) {
                        const diagnosisData = response.data;
                        setDiagnosis(diagnosisData);
                    } else {
                        console.error('Failed to fetch diagnosis.');
                    }
                } catch (error) {
                    console.error('Error fetching diagnosis:', error);
                }
            };

            fetchDiagnosis();
        }
    }, [uid]);

    // Add a function to manually set the uid
    const setUidManually = async (newUid) => {
        setUid(newUid);
    };

    return {
        userType,
        username,
        email,
        uid,
        diagnosis,
        setUidManually, // Function to manually set the uid
    };
}
