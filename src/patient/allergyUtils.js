import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../firebase';
import { useUserData } from '../users/userUtils';
import springApiUrl from "../springConfig";

export function useAllergyData(initialUid = null) {
    const user = useAuth(); // Replace with your Firebase authentication hook
    const { userType, email, username } = useUserData(user);

    const [uid, setUid] = useState(initialUid);
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
        if (initialUid) {
            // If an initial uid is provided, set it as the current uid
            setUid(initialUid);
        }
    }, [initialUid]);

    useEffect(() => {
        if (uid) {
            const fetchAllergies = async () => {
                try {
                    const response = await axios.get(`${springApiUrl}/patients/allergy/all?uid=${uid}`);

                    if (response.status === 200) {
                        const allergyData = response.data;
                        setAllergies(allergyData);
                    } else {
                        console.error('Failed to fetch allergies.');
                    }
                } catch (error) {
                    console.error('Error fetching allergies:', error);
                }
            };

            fetchAllergies();
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
        allergies,
        setUidManually, // Function to manually set the uid
    };
}
