import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import springApiUrl from '../springConfig';

export default function NewDoctor() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        userType: 'DOCTOR',
    });

    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);

    const { username, password, email, userType } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true); // Set isLoading to true when data loading starts

            // Create a new user in Firebase Authentication
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
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
            navigate(`/hospital/doctor/addDetails?uid=${firebaseUser.uid}`);
        } catch (error) {
            // Handle errors, e.g., display an error message
            console.error('Error registering doctor:', error);
            setError(error.message);
        } finally {
            setIsLoading(false); // Set isLoading to false when data loading completes
        }
    };

    async function saveUserDataToMySQL(userData) {
        try {
            // Send a POST request to your backend endpoint to save user data
            // eslint-disable-next-line no-template-curly-in-string
            await axios.post(`${springApiUrl}/users/register`, userData, {
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
                    <h2 className="text-center m-4">Register Doctor</h2>
                    {isLoading ? (
                        <div className="text-center text-primary">Loading...</div>
                    ) : (
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
                    )}
                    {error && <div className="text-danger">{error}</div>}
                </div>
            </div>
        </div>
    );
}
