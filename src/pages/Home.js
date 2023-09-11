import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file


const Home = () => {
    const user = useAuth(); // Use the useAuth hook to get the authenticated user


    return (
            <div>

            </div>
    );
};

export default Home;
