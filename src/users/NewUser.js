import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';

export default function NewUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        userType: '',
    });

    const { username, password, email, userType } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a new user in Firebase Authentication
            const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            const firebaseUser = response.user;

            // Save additional user data, including userType, to MySQL
            const userData = {
                uid: firebaseUser.uid, // Firebase UID as the primary key
                username,
                email,
                userType,
            };

            // Send the user data to your backend to save it to MySQL
            await saveUserDataToMySQL(userData);

            // Handle the response as needed
            console.log('User registered:', firebaseUser);

            // Determine the redirect destination based on user type
            switch (userType) {
                case 'PATIENT':
                    navigate(`/patient/register?uid=${firebaseUser.uid}`);
                    break;
                case 'HOSPITAL':
                    navigate(`/hospital/register?uid=${firebaseUser.uid}`);
                    break;
                case 'PHARMACY':
                    navigate('/pharmacy');
                    break;
                case 'LABORATORY':
                    navigate('/laboratory');
                    break;
                default:
                    // Default redirect if user type is not recognized
                    navigate('/default');
                    break;
            }
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error registering user:', error);
        }
    };

    async function saveUserDataToMySQL(userData) {
        try {
            // Send a POST request to your backend endpoint to save user data
            await axios.post('http://ec2-13-53-36-88.eu-north-1.compute.amazonaws.com:8080/users/register', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error saving user data to MySQL:', error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="UserName" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your name"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userType" className="form-label">
                                User Type
                            </label>
                            <select
                                className="form-select"
                                placeholder="Select User"
                                name="userType"
                                value={userType}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="PATIENT">Patient</option>
                                <option value="HOSPITAL">Hospital</option>
                                <option value="PHARMACY">Pharmacy</option>
                                <option value="LABORATORY">Laboratory</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Next
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger mx-2"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
