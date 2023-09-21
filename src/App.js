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
import DoctorList from "./doctor/doctorList";
import PatientQRGenerator from "./patient/patientQRGenerator";
import DoctorQRScanner from "./doctor/doctorQRScanner";
import NewAllergy from "./patient/newAllergy";
import ViewAllergy from "./patient/viewAllergy";


function App() {
  return (
      <div className="App" style={{backgroundColor: '#202124', height:'100vh'}}>
        <Router>
          <Navbar />
          <div className="container text-light">
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
            <Route exact path="hospital/doctor/new" element={<NewDoctor/>}/>
            <Route exact path="hospital/doctor/addDetails" element={<AddDoctorDetails/>}/>
            <Route exact path="doctor/dashboard" element={<DoctorDashboard/>}/>
            <Route exact path="doctor/profile" element={<DoctorProfile/>}/>
            <Route exact path="hospital/doctor/list" element={<DoctorList/>}/>
            <Route exact path="patient/view/qr" element={<PatientQRGenerator/>}/>
            <Route exact path="doctor/scan/qr" element={<DoctorQRScanner/>}/>
            <Route exact path="patient/allergy/new" element={<NewAllergy/>}/>
            <Route exact path="patient/allergy/view" element={<ViewAllergy/>}/>
          </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
