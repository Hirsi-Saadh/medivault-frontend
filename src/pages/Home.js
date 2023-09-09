import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { useUserData } from '../users/userUtils';

const Home = () => {
    const user = useAuth(); // Use the useAuth hook to get the authenticated user
    const { userType, email, username } = useUserData(user);

    useEffect(() => {
        // You can use the userType, email, and username here
        console.log('User Type:', userType);
        console.log('Email:', email);
        console.log('Username:', username);
    }, [userType, email, username]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <div>
                {user ? (
                    <div>
                        <h2>User Information</h2>
                        <p>User Type: {userType}</p>
                        <p>Email: {email}</p>
                        <p>Username: {username}</p>
                    </div>
                ) : (
                    <p>Not Signed In</p>
                )}
            </div>
        </div>
    );
};

export default Home;
