import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage3 from "../HomePageComponent/HomePage3";
import HomePage2 from "../HomePageComponent/HomePage2";
import HomePage1 from "../HomePageComponent/HomePage1";
import CombinedHome from "../HomePageComponent/CombinedHome";

import WebLogPatient from "../LoginComponent/WebLogPatient";
import WebLogDoctor from "../LoginComponent/WebLogDoctor";
import WebLogAdmin from "../LoginComponent/WebLogAdmin";
import PatientRegister from "../LoginComponent/PatientRegister";

import AddDoctor from "../AdminDashboardComponent/AddDoctor";
import AdminDashBoard, {
  ADashboard,
  ManageDoctors,
  AppointmentHistory,
  ManageUsers,
  NewQueries,
} from "../AdminDashboardComponent/AdminDashBoard";

import PatientDashboard, {
  PDashboard,
  BookAppointment,
  AppointmentHistoryPatient,
  MedicalHistory,
  Profile,
} from "../PatientDashboardComponent/PatientDashboard";

import DoctorDashboard, {
  DDashboard,
  DProfile,
  Appointments,
} from "../DoctorDashboardComponent/DoctorDashboard";

function RoutingPage() {
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments")) || [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const patientInfo = JSON.parse(localStorage.getItem("patientInfo")) || {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    city: "Unknown",
  };

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
        <Route path="/patient-register" element={<PatientRegister />} />

        <Route path="/doctor-login" element={<WebLogDoctor />} />
        <Route path="/admin-login" element={<WebLogAdmin />} />

        <Route path="/Home-Page1" element={<HomePage1 />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/add-doctor" element={<AddDoctor />} />

        <Route path="/admin-dashboard" element={<AdminDashBoard />}>
          <Route index element={<ADashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="appointments" element={<AppointmentHistory />} />
          <Route path="queries" element={<NewQueries />} />
        </Route>

        {/* ================= PATIENT DASHBOARD ROUTES ================= */}
        <Route path="/patient-dashboard" element={<PatientDashboard />}>
          <Route index element={<PDashboard />} />

          <Route
            path="book"
            element={
              <BookAppointment
                appointments={appointments}
                setAppointments={setAppointments}
              />
            }
          />

          <Route
            path="history"
            element={
              <AppointmentHistoryPatient
                appointments={appointments}
                setAppointments={setAppointments}
              />
            }
          />

          <Route path="medical" element={<MedicalHistory />} />
          <Route path="profile" element={<Profile patient={patientInfo} />} />
        </Route>

        {/* ================= DOCTOR DASHBOARD ROUTES ================= */}
        <Route path="/Doctor-dashboard" element={<DoctorDashboard />}>
          <Route index element={<DDashboard />} />
          <Route path="profile" element={<DProfile />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutingPage;