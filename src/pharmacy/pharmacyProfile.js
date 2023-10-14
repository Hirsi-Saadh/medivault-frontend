import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import Sidepane from '../components/layout/sidepane';
import { usePharmacyData } from './pharmacyUtils';

export default function PharmacyProfile() {
  const pharmacy = useAuth(); // Use the useAuth hook to get the authenticated user
  const { userType, username, email, PharmacyName, PharmacyAddress, PharmacyLicense, PharmacyType, PharmacyLicenseBlob } = usePharmacyData(pharmacy);

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data loading with setTimeout (replace with actual data fetching)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after data loading (remove this in production)
    }, 2000); // Replace with the actual data loading code

    // You can use the userType, email, and username here
    console.log('user type:', userType);
    console.log('username:', username);
    console.log('email:', email)
    console.log('Name:', PharmacyName);
    console.log('Type:', PharmacyType);
    console.log('License:', PharmacyLicense);
    console.log('Address:', PharmacyAddress);
    console.log('Image:', PharmacyLicenseBlob);
  }, [userType, email, username, PharmacyName, PharmacyAddress, PharmacyLicense, PharmacyType, PharmacyLicenseBlob]);

  // image base64 to png
  const license_img_url = `data:image/jpeg;base64,${PharmacyLicenseBlob}`;

  return (
      <div className="d-flex" style={{ maxHeight: '80vh' }}>
        <Sidepane />
        <div className="container">
          {isLoading ? (
              <div className="text-light">Loading...</div>
          ) : (
              <div className="mt-3 ms-4 pt-3 container d-flex">
                <ul className="list-unstyled d-flex">
                  <li>
                    <div>
                      <img
                          src="http://www.gravatar.com/avatar/9ce79c699d1e5a2b5db63527abdb2a2f"
                          alt={PharmacyName}
                          className="img-fluid rounded-circle"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="ms-4" style={{ textAlign: 'left', }}>
                      <h4 className="text-light">
                        @{username}
                      </h4>
                      <h6 className="text-light" style={{ textTransform: 'none', fontSize: '18px' }}>
                        {email}
                      </h6>
                      <span className="badge bg-success" style={{ textTransform: 'uppercase' }}>{userType}</span>

                    </div>
                  </li>
                </ul>
              </div>
          )}

          {/*The user information box*/}
          {!isLoading && (
              <div className="UserInfo pt-4">
                <div className="container d-flex">
                  <h5 className="text-light ps-5">User Info</h5>
                </div>
                <div className="container block" style={{ textAlign: 'left', letterSpacing: '1px', fontSize: '18px', borderTop: '2px solid #171717', textTransform: 'capitalize' }}>
                  <div className="container d-flex">
                    <div className="ps-5 container" >
                      <ul className="list-unstyled d-block">
                        <li>
                          <div className="pt-3" >
                            <span className="text-light">Name: </span>
                            <span className="text-light ps-3">{PharmacyName}</span>
                          </div>
                        </li>
                        <li>
                          <div className="pt-3">
                            <span className="text-light">License No : </span>
                            <span className="text-light ps-3">{PharmacyLicense}</span>
                          </div>
                        </li>
                        <li>
                          <div className="pt-3" >
                            <span className="text-light">Address: </span>
                            <span className="text-light ps-3">{PharmacyAddress}</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="container" >
                      <ul className="list-unstyled d-block">
                        <li>
                          <div className="pt-3" >
                            <span className="text-light pe-3">Type: </span>
                            <span className="badge bg-info text-dark">{PharmacyType}</span>
                          </div>
                        </li>
                        <li>
                          <div className="pt-3">
                            <span className="text-light">License: </span>
                            <img src={license_img_url} alt="pharmacy license" width='140px' />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
