import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaUsers, FaSearch, FaFileAlt } from "react-icons/fa";
import { FaUserDoctor, FaClipboardList } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function DoctorDashboard() {
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
            <p className="text-lg font-semibold">Doctor</p>
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
          <SidebarItem to="appointments" icon={<FaFileAlt />} label="Appointments" />
          <SidebarItem to="patients" icon={<FaUsers />} label="Patients" />
          <SidebarItem to="search" icon={<FaSearch />} label="Search" />
        </nav>
      </div>

      {/* MAIN CONTENT */}
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
export function DDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-4xl font-bold my-6">Doctor Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("profile")}
          className="bg-blue-200 p-6 rounded-lg shadow text-center cursor-pointer hover:shadow-lg transition"
        >
          <FaUserDoctor className="text-4xl mx-auto mb-2 text-blue-700" />
          <h2 className="text-lg font-semibold">My Profile</h2>
        </div>

        <div
          onClick={() => navigate("appointments")}
          className="bg-blue-200 p-6 rounded-lg shadow text-center cursor-pointer hover:shadow-lg transition"
        >
          <FaClipboardList className="text-4xl mx-auto mb-2 text-blue-700" />
          <h2 className="text-lg font-semibold">My Appointments</h2>
        </div>
      </div>
    </>
  );
}

/* PROFILE PAGE */
export function Profile() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow max-w-3xl space-y-3">
        <p><strong>Name:</strong> Dr. John Smith</p>
        <p><strong>Specialization:</strong> Cardiology</p>
        <p><strong>Email:</strong> johnsmith@email.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
        <p><strong>Experience:</strong> 8 Years</p>
        <p><strong>Hospital:</strong> Cureonix Hospital</p>
      </div>
    </>
  );
}

/* APPOINTMENTS */
export function Appointments() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Appointments" value="12" />
        <StatCard title="Completed" value="9" />
        <StatCard title="Pending" value="3" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Upcoming Appointment</h3>
        <p><b>Patient:</b> Rahul Sharma</p>
        <p><b>Date:</b> 12 Oct 2026</p>
        <p><b>Time:</b> 10:30 AM</p>
        <p><b>Type:</b> Cardiology Consultation</p>
      </div>
    </>
  );
}

/* PATIENTS */
export function Patients() {
  return <h2 className="text-2xl font-bold">Patients</h2>;
}

/* SEARCH */
export function Search() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Search</h2>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded w-full max-w-md"
      />
    </>
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