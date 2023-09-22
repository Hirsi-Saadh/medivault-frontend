import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { usePatientData } from './patientUtils';
import Sidepane from '../components/layout/sidepane';

export default function PatientProfile() {
  const patient = useAuth(); // Use the useAuth hook to get the authenticated user
  const { userType, email, username, FirstName, LastName, Age, Address, DateOfBirth, Height, Weight, bloodGroup } = usePatientData(patient);

  // State variables to track loading state
  const [isLoadingUsername, setIsLoadingUsername] = useState(true);
  const [isLoadingFirstName, setIsLoadingFirstName] = useState(true);
  const [isLoadingLastName, setIsLoadingLastName] = useState(true);
  const [isLoadingAge, setIsLoadingAge] = useState(true);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [isLoadingDateOfBirth, setIsLoadingDateOfBirth] = useState(true);
  const [isLoadingHeight, setIsLoadingHeight] = useState(true);
  const [isLoadingWeight, setIsLoadingWeight] = useState(true);
  const [isLoadingBloodGroup, setIsLoadingBloodGroup] = useState(true);
  // Add similar state variables for other pieces of information

  useEffect(() => {
    // Simulate loading delay for username (replace with actual database fetch)
    setTimeout(() => {
      setIsLoadingUsername(false);
    }, 1000);

    // Simulate loading delay for FirstName (replace with actual database fetch)
    setTimeout(() => {
      setIsLoadingFirstName(false);
    }, 1500);

    // Simulate loading delay for LastName (replace with actual database fetch)
    setTimeout(() => {
      setIsLoadingLastName(false);
    }, 2000);

    // Simulate loading delay for LastName (replace with actual database fetch)
    setTimeout(() => {
      setIsLoadingAge(false);
    }, 2000);

    setTimeout(() => {
      setIsLoadingAddress(false);
    }, 2000);

    setTimeout(() => {
      setIsLoadingDateOfBirth(false);
    }, 2000);

    setTimeout(() => {
      setIsLoadingHeight(false);
    }, 2000);

    setTimeout(() => {
      setIsLoadingWeight(false);
    }, 2000);

    setTimeout(() => {
      setIsLoadingBloodGroup(false);
    }, 2000);

    // Add similar setTimeouts for other pieces of information
  }, []);

  return (
      <div className="d-flex" style={{ maxHeight: '80vh' }}>
        <Sidepane />
        <div className="container">
          {/* User information */}
          <div className="mt-3 ms-4 pt-3 container d-flex">
            <ul className="list-unstyled d-flex">
              <li>
                <div>
                  <img
                      src="http://www.gravatar.com/avatar/9ce79c699d1e5a2b5db63527abdb2a2f"
                      alt={FirstName}
                      className="img-fluid rounded-circle"
                  />
                </div>
              </li>
              <li>
                <div className="ms-4" style={{ textAlign: 'left' }}>
                  <h4 className="text-light">@{isLoadingUsername ? 'Loading...' : username}</h4>
                  <h6 className="text-light" style={{ textTransform: 'none', fontSize: '18px' }}>
                    {isLoadingFirstName ? 'Loading...' : FirstName}
                  </h6>
                  <span className="badge bg-success" style={{ textTransform: 'uppercase' }}>
                  {userType}
                </span>
                </div>
              </li>
            </ul>
          </div>

          {/* The user information box */}
          <div className="UserInfo pt-4">
            <div className="container d-flex">
              <h5 className="text-light ps-5">User Info</h5>
            </div>
            <div
                className="container block"
                style={{ textAlign: 'left', letterSpacing: '1px', fontSize: '18px', borderTop: '2px solid #171717', textTransform: 'capitalize' }}
            >
              <div className="container d-flex">
                <div className="ps-5 container">
                  <ul className="list-unstyled d-block">
                    <li>
                      <div className="pt-3">
                        <span className="text-light">First Name: </span>
                        <span className="text-light ps-3">{isLoadingFirstName ? 'Loading...' : FirstName}</span>
                      </div>
                    </li>
                    <li>
                      <div className="pt-3">
                        <span className="text-light">Last Name: </span>
                        <span className="text-light ps-3">{isLoadingLastName ? 'Loading...' : LastName}</span>
                      </div>
                    </li>
                    {/* Add similar loading checks for other pieces of information */}
                  </ul>
                </div>

                <div className="container">
                  <ul className="list-unstyled d-block">
                    <li>
                      <div className="pt-3">
                        <span className="text-light pe-3">Age: </span>
                        <span className="badge bg-info text-dark">{isLoadingAge ? 'Loading...' : Age}</span>
                      </div>
                    </li>
                    <li>
                      <div className="pt-3">
                        <span className="text-light">Date of Birth: </span>
                        <span className="text-light ps-3">{isLoadingDateOfBirth ? 'Loading...' : DateOfBirth}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* The bio information box */}
          <div className="BioInfo mt-4">
            <div className="container d-flex">
              <h5 className="text-light ps-5">Bio Info</h5>
            </div>
            <div
                className="container block"
                style={{ textAlign: 'left', letterSpacing: '1px', fontSize: '18px', borderTop: '2px solid #171717' }}
            >
              <div className="container d-flex">
                <div className="ps-5 container">
                  <ul className="list-unstyled d-block">
                    <li>
                      <div className="pt-3">
                        <span className="text-light">Height: </span>
                        <span className="text-light ps-3">{isLoadingHeight ? 'Loading...' : Height}cm</span>
                      </div>
                    </li>
                    <li>
                      <div className="pt-3">
                        <span className="text-light">Weight: </span>
                        <span className="text-light ps-3">{isLoadingWeight ? 'Loading...' : Weight}kg</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="container">
                  <ul className="list-unstyled d-block">
                    <li>
                      <div className="pt-3">
                        <span className="text-light pe-3">Blood: </span>
                        <span className="badge bg-danger text-ligh">{isLoadingBloodGroup ? 'Loading...' : bloodGroup}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
