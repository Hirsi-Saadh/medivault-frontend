import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase';
import { useUserData } from '../users/userUtils';

const Home = () => {
    const user = useAuth();
    const navigate = useNavigate();
    const { userType } = useUserData(user);

    useEffect(() => {
        // Check if the user is authenticated
        if (user) {
            // If authenticated, navigate based on user type
            switch (userType.toLowerCase()) {
                case 'patient':
                    navigate(`/patient/dashboard`);
                    break;
                case 'doctor':
                    navigate('/doctor/dashboard');
                    break;
                case 'hospital':
                    navigate(`/hospital/dashboard`);
                    break;
                case 'pharmacy':
                    navigate('/pharmacy/dashboard');
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
    }, [user, userType, navigate]);

    // Render content for the home page
    return (
        <div>
            {/* Your home page content */}
        </div>
    );
};

export default Home;
