import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import Sidepane from '../components/layout/sidepane';
import {useDoctorData} from "./doctorUtils";

export default function DoctorProfile() {
  const doctor = useAuth(); // Use the useAuth hook to get the authenticated user
  const { userType,
    username,
    email,
    DoctorFirstName,
    DoctorLastName,
    DoctorAddress,
    DoctorLicense,
    DoctorType,
    DoctorSpecialization,
    DoctorImageBlob,
    DoctorImageBase64,
    DoctorLicenseBlob,
    DoctorLicenseBase64, } = useDoctorData(doctor);

  useEffect(() => {
    // You can use the userType, email, and username here
    console.log('user type:', userType);
    console.log('username:', username);
    console.log('email:', email);
    console.log('First Name:', DoctorFirstName);
    console.log('Last Name:', DoctorLastName);
    console.log('Type:', DoctorType);
    console.log('License:', DoctorLicense);
    console.log('Address:', DoctorAddress);
    console.log('Specialization:', DoctorSpecialization);
  }, [
    userType,
    username,
    email,
    DoctorFirstName,
    DoctorLastName,
    DoctorAddress,
    DoctorLicense,
    DoctorType,
    DoctorSpecialization,
    DoctorImageBlob,
    DoctorImageBase64,
    DoctorLicenseBlob,
    DoctorLicenseBase64,
  ]);

  // image base64 to png
  const profile_img_url = `data:image/jpeg;base64,${DoctorImageBlob}`;
  const license_img_url = `data:image/jpeg;base64,${DoctorLicenseBlob}`;


  return (
      <div className="d-flex" style={{maxHeight: '80vh'}}>
        <Sidepane />
        <div className="container" >
          <div className="mt-3 ms-4 pt-3 container d-flex" >
            <ul className="list-unstyled d-flex">
              <li>
                <div>
                  <img
                      src={profile_img_url}
                      alt={DoctorFirstName}
                      width='100px'
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
                      <span className="text-light ps-3">{DoctorFirstName}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3" >
                      <span className="text-light">Last Name: </span>
                      <span className="text-light ps-3">{DoctorLastName}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3">
                      <span className="text-light">License No : </span>
                      <span className="text-light ps-3">{DoctorLicense}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3" >
                      <span className="text-light">Address: </span>
                      <span className="text-light ps-3">{DoctorAddress}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="container" >
                <ul className="list-unstyled d-block">
                  <li>
                    <div className="pt-3" >
                      <span className="text-light pe-3">Type: </span>
                      <span className="badge bg-info text-dark">{DoctorType}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3" >
                      <span className="text-light pe-3">Specialization: </span>
                      <span className="badge bg-info text-dark">{DoctorSpecialization}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3">
                      <span className="text-light">License: </span>
                      <img src = {license_img_url} alt="medical license" width='140px' />
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
