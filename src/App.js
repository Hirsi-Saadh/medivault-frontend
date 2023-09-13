import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/layout/Navbar';
import NewUser from './users/NewUser';
import UserLogin from './users/UserLogin';
import Home from './pages/Home';
import PatientProfile from './patient/patientProfile';
import NewHospital from './hospital/newHospital';
import NewLaboratory from './laboratory/newLaboratory';
import NewPharmacy from './pharmacy/pharmacy';
import NewDoctor from "./doctor/newDoctor";
import NewPatient from "./patient/newPatient";
import PatientDashboard from "./patient/patientDashboard";
import HospitalDashboard from "./hospital/hospitalDashboard";
import HospitalProfile from "./hospital/hospitalProfile";
import AddDoctorDetails from "./doctor/AddDoctorDetails";
import DoctorDashboard from "./doctor/doctorDashboard";
import DoctorProfile from "./doctor/doctorProfile";


function App() {
  return (
      <div className="App" style={{backgroundColor: '#202124', height:'100vh'}}>
        <Router>
          <Navbar />
          <div className="container">
          <Routes>
            <Route exact path="users/register" element={<NewUser />} />
            <Route exact path="users/login" element={<UserLogin />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="patient/profile" element={<PatientProfile />} />
            <Route exact path="hospital/register" element={<NewHospital />} />
            <Route exact path="laboratory/register" element={<NewLaboratory />} />
            <Route exact path="pharmacy/register" element={<NewPharmacy />} />
            <Route exact path="hospital/doctor/register" element={<NewDoctor />}/>
            <Route exact path="patient/register" element={<NewPatient/>}/>
            <Route exact path="patient/dashboard" element={<PatientDashboard/>}/>
            <Route exact path="hospital/dashboard" element={<HospitalDashboard/>}/>
            <Route exact path="hospital/profile" element={<HospitalProfile/>}/>
            <Route exact path="hospital/newdoctor" element={<NewDoctor/>}/>
            <Route exact path="hospital/newdoctor/adddetails" element={<AddDoctorDetails/>}/>
            <Route exact path="doctor/dashboard" element={<DoctorDashboard/>}/>
            <Route exact path="doctor/profile" element={<DoctorProfile/>}/>
          </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
