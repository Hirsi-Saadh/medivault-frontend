import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import axios from 'axios';
import springApiUrl from '../springConfig';

export default function UserLogin() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false); // Loading state for Firebase
  const [isLoadingMySQL, setIsLoadingMySQL] = useState(false); // Loading state for MySQL
  const [error, setError] = useState(null);

  const { email, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingFirebase(true); // Start Firebase loading

      // Sign in with Firebase Authentication
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (response.user) {
        // Fetch user type from your Spring Boot backend
        const uid = response.user.uid;

        // After Firebase authentication is done, start MySQL loading
        setIsLoadingMySQL(true);

        const userTypeResponse = await axios.get(`${springApiUrl}/users/usertype?uid=${uid}`,{timeout: 10000});

        if (userTypeResponse.status === 200) {
          const userType = userTypeResponse.data;
          console.log('User Type:', userType);

          // Navigate to the success page based on user type
          // Assuming userType is an object as shown in your example
          const userTypeValue = userType.userType;

          if (typeof userTypeValue === 'string') {
            switch (userTypeValue.toLowerCase()) {
              case 'patient':
                navigate('/patient/dashboard');
                break;
              case 'hospital':
                navigate('/hospital/dashboard');
                break;
              case 'doctor':
                navigate('/doctor/dashboard');
                break;


                // Add more cases for other user types
              default:
                // Redirect to the homepage if user type is not recognized
                navigate('/');
                break;
            }
          } else {
            // Handle the case where userTypeValue is not a valid string
            console.error("Invalid userTypeValue:", userTypeValue);
            // You can choose to display an error message or handle this case as needed.
          }
        } else {
          console.error('User not found in MySQL.');
          setError('User not found in MySQL.');
        }
      } else {
        console.error('Login failed:', response);
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again later.');
    } finally {
      setIsLoadingFirebase(false); // End Firebase loading
      setIsLoadingMySQL(false); // End MySQL loading
    }
  };

  // You can check both loading states to display a combined loading indicator
  const isCombinedLoading = isLoadingFirebase || isLoadingMySQL;

  return (
      <div className="mt-5 container">
        <div className="row">
          <div className="col-md-5 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4 text-light">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <label htmlFor="Email" className="form-label text-light">
                  Email
                </label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <label htmlFor="Password" className="form-label text-light">
                  Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary" disabled={isCombinedLoading}>
                {isCombinedLoading ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
