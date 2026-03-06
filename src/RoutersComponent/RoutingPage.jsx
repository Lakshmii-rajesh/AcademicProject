import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage3 from "../HomePageComponent/HomePage3";
import HomePage2 from "../HomePageComponent/HomePage2";
import HomePage1 from "../HomePageComponent/HomePage1";
import WebLogPatient from "../LoginComponent/WebLogPatient";
import WebLogDoctor from "../LoginComponent/WebLogDoctor";
import WebLogAdmin from "../LoginComponent/WebLogAdmin";
import AddDoctor from "../AdminDashboardComponent/AddDoctor";
import AdminDashBoard,{ADashboard, ManageDoctors, ManagePatients, AppointmentHistory, ManageUsers, NewQueries, PatientSearch} from "../AdminDashBoardComponent/AdminDashBoard";
import PatientDashboard,{PDashboard,BookAppointment,AppointmentHistoryPatient,MedicalHistory} from "../PatientDashboardComponent/PatientDashboard";

import DoctorDashboard,{DDashboard,Profile,Appointments,Search,Patients} from "../DoctorDashboardComponent/DoctorDashboard";
import CombinedHome from "../HomePageComponent/CombinedHome";

function RoutingPage() {
  return (

    <div>

      <Routes>
        
        <Route path="/aboutus" element={<HomePage3 />} />
        <Route path="/about-us" element={<HomePage3 />} />
        <Route path="/login" element={<HomePage2 />} />
        <Route path="/register" element={<HomePage2 />} />
        <Route path="/contact" element={<HomePage3 />} />
        <Route path="/online-appointment" element={<HomePage2 />} />
        <Route path="/home-page" element={<CombinedHome />} />
        <Route path="/" element={<CombinedHome />} />
        <Route path="/patient-login" element={<WebLogPatient />} />

        <Route path="/doctor-login" element={<WebLogDoctor />} />
        <Route path="/admin-login" element={<WebLogAdmin />} />
        <Route path="/Doctor-login" element={<WebLogDoctor />} />
        {/* <Route  /> */}
      
        <Route path="/Home-Page1" element={<HomePage1 />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />



        <Route path="/admin-dashboard" element={<AdminDashBoard />}>
          {/* {/* <Route index /> */}
          <Route index element={<ADashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="patients" element={<ManagePatients />} />
          <Route path="appointments" element={<AppointmentHistory />} />
          <Route path="search" element={<PatientSearch />} />
          <Route path="queries" element={<NewQueries />} /> 
        </Route>

        <Route path="patient-dashboard" element={<PatientDashboard /> }>
        <Route index element={<PDashboard />} />
                  <Route path="book" element={<BookAppointment />} />
                  <Route path="history" element={<AppointmentHistoryPatient />} />
                  <Route path="medical" element={<MedicalHistory />} />
        </Route>

 
      <Route path="/Doctor-dashboard"element={<DoctorDashboard />}>
          <Route index element={<DDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="search" element={<Search />} />
        </Route>
     </Routes>
     

    </div>
  );
}

export default RoutingPage;
