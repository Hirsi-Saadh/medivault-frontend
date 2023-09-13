import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import Sidepane from '../components/layout/sidepane';
import {useHospitalData} from "./hospitalUtils";

export default function HospitalProfile() {
  const hospital = useAuth(); // Use the useAuth hook to get the authenticated user
  const { userType, username, email, HospitalName, HospitalAddress, HospitalLicense, HospitalType, MedicalLicenseBlob } = useHospitalData(hospital);

  useEffect(() => {
    // You can use the userType, email, and username here
    console.log('user type:', userType);
    console.log('username:', username);
    console.log('email:', email)
    console.log('Name:', HospitalName);
    console.log('Type:', HospitalType);
    console.log('License:', HospitalLicense);
    console.log('Address:', HospitalAddress);
    console.log('Image:', MedicalLicenseBlob);
  }, [userType, email, username, HospitalName, HospitalAddress, HospitalLicense, HospitalType, MedicalLicenseBlob]);

  // image base64 to png
  const license_img_url = `data:image/jpeg;base64,${MedicalLicenseBlob}`;

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
                      alt={HospitalName}
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
                      <span className="text-light">Name: </span>
                      <span className="text-light ps-3">{HospitalName}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3">
                      <span className="text-light">License No : </span>
                      <span className="text-light ps-3">{HospitalLicense}</span>
                    </div>
                  </li>
                  <li>
                    <div className="pt-3" >
                      <span className="text-light">Address: </span>
                      <span className="text-light ps-3">{HospitalAddress}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="container" >
                <ul className="list-unstyled d-block">
                  <li>
                    <div className="pt-3" >
                      <span className="text-light pe-3">Type: </span>
                      <span className="badge bg-info text-dark">{HospitalType}</span>
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
