import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/layout/Navbar';
import NewUser from './users/NewUser';
import UserLogin from './users/UserLogin';
import Home from './pages/Home';
import PatientProfile from './patient/PatientProfile';
import NewHospital from './hospital/newHospital';
import NewLaboratory from './laboratory/newLaboratory';
import NewPharmacy from './pharmacy/pharmacy';
import NewDoctor from './hospital/registerDoctor';
import NewPatient from "./patient/newPatient";


function App() {
  return (
      <div className="App" style={{backgroundColor: '#202124'}}>
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
          </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
