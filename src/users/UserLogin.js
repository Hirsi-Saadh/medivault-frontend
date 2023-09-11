import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import axios from 'axios';

export default function UserLogin() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with Firebase Authentication
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (response.user) {
        // Fetch user type from your Spring Boot backend
        const uid = response.user.uid;
        const userTypeResponse = await axios.get(`http://localhost:8080/users/usertype?uid=${uid}`);

        if (userTypeResponse.status === 200) {
          const userType = userTypeResponse.data;
          console.log('User Type:', userType);

          // Redirect to the homepage or handle success as needed
          navigate('/');
        } else {
          // Handle errors (e.g., user not found in MySQL)
          console.error('User not found in MySQL.');
        }
      } else {
        console.error('Login failed:', response);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
      <div className="mt-5 container">
        <div className="row">
          <div className="col-md-5 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4 text-light">Login</h2>
            <form onSubmit={(e) => onSubmit(e)} >
              <div className="mb-3" style={{textAlign:'left'}}>
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
              <div className="mb-3" style={{textAlign:'left'}}>
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
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
