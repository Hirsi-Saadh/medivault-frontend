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
import NewPharmacy from './pharmacy/newPharmacy';
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
import ViewPatientByDoctor from "./doctor/viewPatientByDoctor";
import NewDiagnosis from "./patient/newDiagnosis";
import ViewDiagnosis from "./patient/viewDiagnosis";
import ViewPrescriptions from "./patient/viewPrescriptionHistory";
import ViewPrescriptionsHistory from "./patient/viewPrescriptionHistory";
import ViewPrescription from "./patient/viewPrescriptions";
import PrescribedMedication from "./patient/prescribedMedication";
import PharmacyDashboard from "./pharmacy/pharmacyDashboard";
import PharmacyProfile from "./pharmacy/pharmacyProfile";
import PharmacyQRScanner from "./pharmacy/pharmacyQRScanner";
import ShowPrescriptions from "./pharmacy/showPrescriptions";
import LaboratoryDashboard from "./laboratory/laboratoryDashboard";
import LaboratoryProfile from "./laboratory/laboratoryProfile";
import LaboratoryQRScanner from "./laboratory/LaboratoryScanQR";
import ReportManagement from "./laboratory/reportManagment";


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
            <Route exact path="doctor/chanelling/view-patient" element={<ViewPatientByDoctor/>}/>
            <Route exact path="patient/diagnosis/new" element={<NewDiagnosis/>}/>
            <Route exact path="patient/diagnosis/view" element={<ViewDiagnosis/>}/>
            <Route exact path="patient/prescriptions/view-history" element={<ViewPrescriptionsHistory/>}/>
            <Route exact path="patient/prescriptions/view" element={<ViewPrescription/>}/>
            <Route exact path="patient/prescriptions/medication/view" element={<PrescribedMedication/>}/>
            <Route exact path="pharmacy/dashboard" element={<PharmacyDashboard/>}/>
            <Route exact path="pharmacy/profile" element={<PharmacyProfile/>}/>
            <Route exact path="pharmacy/scan/qr" element={<PharmacyQRScanner/>}/>
            <Route exact path="pharmacy/view/prescription" element={<ShowPrescriptions/>}/>
            <Route exact path="laboratory/dashboard" element={<LaboratoryDashboard/>}/>
            <Route exact path="laboratory/profile" element={<LaboratoryProfile />} />
            <Route exact path="laboratory/scan/qr" element={<LaboratoryQRScanner/>}/>
            <Route exact path="laboratory/manage/reports" element={<ReportManagement/>}/>

          </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
