import { useState, useEffect } from 'react';
import axios from 'axios';

export function useUserData(user) {
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                try {
                    const uid = user.uid;
                    const userTypeResponse = await axios.get(`http://localhost:8080/users/usertype?uid=${uid}`);

                    if (userTypeResponse.status === 200) {
                        const userData = userTypeResponse.data;
                        setUserType(userData.userType);
                        setEmail(userData.email);
                        setUsername(userData.username);
                    } else {
                        console.error('User not found in MySQL.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchData();
        }
    }, [user]);

    return { userType, email, username };
}
