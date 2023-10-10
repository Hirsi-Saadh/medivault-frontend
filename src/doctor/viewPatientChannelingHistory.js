import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase';
import { useLocation } from 'react-router-dom';
import springApiUrl from "../springConfig";
import {formatDate} from "../assets/utils/timeUtils";

export default function ViewPatientChannelingHistory() {
    const user = useAuth();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const patientUidFromQuery = params.get('patient_uid');
    console.log('Patient UID from query:', patientUidFromQuery);

    const [channelings, setChannelings] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    // Check if the user is available before accessing its properties
    const userUid = user?.uid;

    useEffect(() => {
        // Fetch prescription history based on patientUid and doctorUid
        if (userUid) {
            fetchChannelingHistory(patientUidFromQuery, userUid);
        }
    }, [patientUidFromQuery, userUid]);

    const fetchChannelingHistory = async (patientUid, doctorUid) => {
        // Make an API request to fetch prescription history by patientUid and doctorUid
        try {
            const response = await fetch(`${springApiUrl}/prescriptions/history?patientUid=${patientUid}&doctorUid=${doctorUid}`);

            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // Check if the response is JSON
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setChannelings(data);
                } else {
                    console.error('Response is not JSON');
                }
            } else {
                console.error('Failed to fetch prescription history');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Set loading to false when data fetching is complete
            setLoading(false);
        }
    };


    return (


                <div className="mt-3 ms-4 pt-3 container d-block" style={{textAlign:'left', width:'350px', borderRadius:'25px 25px 25px 25px', backgroundColor:'#171717'}}>
                    <div>
                        <h2>Channeling History</h2>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            channelings.length > 0 ? (
                                <div>
                                    {/* Display the list of prescription history */}
                                    <div  style={{ overflowX: 'hidden', overflowY: 'auto', height: '250px', scrollbarWidth: 'thin', scrollbarColor: 'darkgray lightgray' }}>
                                    <ul>
                                        {channelings.map((channeling, index) => (
                                            <li key={index}>
                                                {/* Display channeling details */}
                                                <div className='mb-1 p-2' style={{backgroundColor: '#252323'}}>
                                                    <div>
                                                <p>Channeling ID: {channeling.id}</p>
                                                {formatDate(channeling.addedTime)}
                                                </div>
                                                <a href={`/patient/prescriptions/medication/view?id=${channeling.id}`}><span className="badge bg-primary rounded-pill">Details</span></a>
                                                {/* Add more channeling fields as needed */}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>
                            ) : (
                                <p>No prescription history found for this patient.</p>
                            )
                        )}
                    </div>
                </div>

    );
}
