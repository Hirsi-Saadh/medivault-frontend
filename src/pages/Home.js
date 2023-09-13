import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase';
import {useUserData} from "../users/userUtils";

const Home = () => {
    const user = useAuth(); // Use the useAuth hook to get the authenticated user
    const navigate = useNavigate();
    const { userType } = useUserData(user);

    // Check if the user is authenticated
    if (user) {
        // If authenticated, navigate to the dashboard
        switch (userType.toLowerCase()) {
            case 'patient':
                navigate(`/patient/dashboard`);
                break;
            case 'doctor':
                navigate('/doctor');
                break;
            case 'hospital':
                navigate(`/hospital/dashboard`);
                break;
            case 'pharmacy':
                navigate('/pharmacy/pharmacy');
                break;
            case 'laboratory':
                navigate('/laboratory/dashboard');
                break;
            default:
                // Default redirect if user type is not recognized
                navigate('/');
                break;
        }
    }

    // If not authenticated or after the redirect, stay on the home page
    return (
        <div>
            {/* Your home page content */}
        </div>
    );
};

export default Home;
