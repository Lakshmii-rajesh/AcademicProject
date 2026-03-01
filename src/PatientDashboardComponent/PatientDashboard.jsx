import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaCalendarAlt, FaFileAlt, FaNotesMedical } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import { User, Calendar, FileText } from "lucide-react";


export default function PatientDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-blue-200 flex justify-between items-center px-6 py-4 shadow relative">
        {!isOpen && (
          <button className="text-3xl" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
            <IoPerson size={35} color="blue" />
            <p className="text-lg font-semibold">Patient</p>
            <RiArrowDropDownLine size={35} />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md">
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-200"
                onClick={() => (window.location.href = "/login")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <p className="text-xl font-bold">CUREONIX</p>
          <button onClick={() => setIsOpen(false)}>
            <ImCross />
          </button>
        </div>

        <nav className="space-y-1 mt-2">
          <SidebarItem to="." icon={<FaHome />} label="Dashboard" />
          <SidebarItem to="book" icon={<FaCalendarAlt />} label="Book Appointment" />
          <SidebarItem to="history" icon={<FaFileAlt />} label="Appointment History" />
          <SidebarItem to="medical" icon={<FaNotesMedical />} label="Medical History" />
        </nav>
      </div>

      {/* MAIN */}
      <div className={`p-6 transition-all duration-300 ${isOpen ? "ml-64" : ""}`}>
       <Outlet/>
      </div>
    </div>
  );
}

/* SIDEBAR ITEM */
export function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded hover:text-blue-600 ${
          isActive ? "text-blue-600 font-semibold" : "text-gray-700"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

/* DASHBOARD */
export function PDashboard() {
  return (
    <>
      <h1 className="text-4xl font-bold my-6">Patient Dashboard</h1>

      <div className="bg-blue-200 p-5 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
        <p>Here is your health summary</p>
      </div>

      
    </>
  );
}

/* BOOK APPOINTMENT */
export function BookAppointment() {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <select className="border p-2 rounded">
          <option>Select Department</option>
          <option>Cardiology</option>
          <option>Dermatology</option>
        </select>

        <select className="border p-2 rounded">
          <option>Select Doctor</option>
          <option>Dr. John</option>
          <option>Dr. Priya</option>
        </select>

        <input type="date" className="border p-2 rounded" />
        <input type="time" className="border p-2 rounded" />
      </div>

      <textarea
        placeholder="Describe your problem"
        className="border p-2 rounded w-full mt-4"
        rows="4"
      />

      <button className="bg-blue-500 text-white px-6 py-2 rounded mt-4">
        Book Appointment
      </button>
    </div>
  );
}

/* APPOINTMENT HISTORY */
export function AppointmentHistoryPatient() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Appointment History</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Appointments" value="12" />
        <StatCard title="Completed" value="9" />
        <StatCard title="Pending" value="3" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Upcoming Appointment</h3>
        <p><b>Doctor:</b> Dr. Smith</p>
        <p><b>Date:</b> 12 Oct 2026</p>
        <p><b>Time:</b> 10:30 AM</p>
      </div>
      
    </>
  );
}

/* MEDICAL HISTORY */
export function MedicalHistory() {
  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Patient Details</h3>
        <p><b>Name:</b> John Doe</p>
        <p><b>Blood Group:</b> O+</p>
        <p><b>Allergies:</b> None</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Visit History</h3>

        <div className="border-l-4 border-blue-500 pl-4 mb-4">
          <p className="font-semibold">10 Oct 2026</p>
          <p>General Checkup</p>
        </div>

        <div className="border-l-4 border-blue-500 pl-4">
          <p className="font-semibold">12 Sep 2026</p>
          <p>Skin Allergy Treatment</p>
        </div>
      </div>

    </div>
  );
}

/* STAT CARD */
export function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl text-blue-600 font-bold">{value}</p>
    </div>
  );
}