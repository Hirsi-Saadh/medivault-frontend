import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { usePatientData } from './patientUtils';
import Sidepane from '../components/layout/sidepane';

export default function PatientProfile() {
  const patient = useAuth(); // Use the useAuth hook to get the authenticated user
  const { userType, email, username, FirstName, LastName, Age, Address, DateOfBirth } = usePatientData(patient);

  useEffect(() => {
    // You can use the userType, email, and username here
    console.log('user type:', userType);
    console.log('username:', username);
    console.log('email:', email)
    console.log('First Name:', FirstName);
    console.log('Last Name:', LastName);
    console.log('Age:', Age);
    console.log('Address:', Address);
    console.log('DOB:', DateOfBirth);
  }, [userType, email, username, FirstName, LastName, Age, Address, DateOfBirth]);

  return (
      <div className="d-flex" style={{maxHeight: '80vh'}}>
        <Sidepane />
        <div className="container" >
          <div className="mt-3 ms-4 pt-3 container d-flex" >
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
                <div className="ms-4"  style={{ textAlign: 'left', }}>
                  <h4 className="text-light">
                    @{username}
                  </h4>
                  <h6 className="text-light" style={{textTransform:'none', fontSize: '18px'}}>
                    {email}
                  </h6>
                  <span className="badge bg-success" style={{textTransform:'uppercase'}}>{userType}</span>

                </div>
              </li>
            </ul>
          </div>
          {/*The user information box*/}
          <div className="UserInfo pt-4">
            <div className="container d-flex">
              <h5 className="text-light ps-5">User Info</h5>
            </div>
            <div className="container block" style={{textAlign: 'left', letterSpacing:'1px', fontSize:'18px',borderTop: '2px solid #171717', textTransform:'capitalize'}}>
              <div className="container d-flex">
              <div className="ps-5 container" >
                <ul className="list-unstyled d-block">
                  <li>
                    <div className="pt-3" >
                      <span className="text-light">First Name: </span>
                      <span className="text-light ps-3">{FirstName}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3">
                      <span className="text-light">Last Name: </span>
                      <span className="text-light ps-3">{LastName}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3" >
                      <span className="text-light">Address: </span>
                      <span className="text-light ps-3">{Address}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="container" >
                <ul className="list-unstyled d-block">
                  <li>
                    <div className="pt-3" >
                      <span className="text-light pe-3">Age: </span>
                      <span className="badge bg-info text-dark">{Age}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3">
                      <span className="text-light">Date of Birth: </span>
                      <span className="text-light ps-3">{DateOfBirth}</span>
                    </div>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>

          {/*The bio information box*/}
          <div className="BioInfo mt-4">
            <div className="container d-flex">
              <h5 className="text-light ps-5">Bio Info</h5>
            </div>
            <div className="container block" style={{textAlign: 'left', letterSpacing:'1px', fontSize:'18px',borderTop: '2px solid #171717', textTransform:'capitalize'}}>
              <div className="container d-flex">
                <div className="ps-5 container" >
                  <ul className="list-unstyled d-block">
                    <li>
                      <div className="pt-3" >
                        <span className="text-light">Height: </span>
                        <span className="text-light ps-3">56cm</span>
                      </div>
                    </li>
                    <li>
                      <div className="pt-3">
                        <span className="text-light">Weight: </span>
                        <span className="text-light ps-3">96kg</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="container" >
                  <ul className="list-unstyled d-block">
                    <li>
                      <div className="pt-3" >
                        <span className="text-light pe-3">Blood: </span>
                        <span className="badge bg-danger text-ligh">O+</span>
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
