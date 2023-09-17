import React, { useEffect } from 'react';
import { useAuth } from '../firebase'; // Import the useAuth hook from your firebase.js file
import { usePatientData } from './patientUtils';
import Sidepane from '../components/layout/sidepane';

export default function PatientDashboard() {
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
                    <h4 className="pt-3 text-light">Welcome back {username}, </h4>
                </div>

            </div>
        </div>
    );
}
