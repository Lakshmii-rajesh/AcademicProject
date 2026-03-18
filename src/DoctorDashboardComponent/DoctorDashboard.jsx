import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaFileAlt } from "react-icons/fa";
import { FaUserDoctor, FaClipboardList } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

// MAIN DOCTOR DASHBOARD COMPONENT
export default function DoctorDashboard() {
  const [isOpen, setIsOpen] = useState(false); // controls sidebar open/close
  const [open, setOpen] = useState(false); // controls profile dropdown
  const dropdownRef = useRef(null); // reference for clicking outside
  const navigate = useNavigate();

  // Navigate to default dashboard page when component mounts
  useEffect(() => {
    navigate(".", { replace: true });
  }, []);

  // Close profile dropdown if clicked outside
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
      <div className="bg-blue-300 flex justify-between items-center px-6 py-4 shadow relative">
        {/* Hamburger button for sidebar */}
        {!isOpen && (
          <button className="text-3xl" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        )}

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <IoPerson size={35} color="blue" />
            <p className="text-lg font-semibold">Doctor</p>
            <RiArrowDropDownLine size={35} />
          </div>

          {/* Dropdown menu */}
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
        {/* Sidebar header */}
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <p className="text-xl font-bold">CUREONIX</p>
          <button onClick={() => setIsOpen(false)}>
            <ImCross />
          </button>
        </div>

        {/* Sidebar navigation links */}
        <nav className="space-y-1 mt-2">
          <SidebarItem to="." icon={<FaHome />} label="Dashboard" />
          <SidebarItem to="appointments" icon={<FaFileAlt />} label="Appointments" />
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className={`p-6 transition-all duration-300 ${isOpen ? "ml-64" : ""}`}>
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

/* SIDEBAR ITEM COMPONENT */
function SidebarItem({ to, icon, label }) {
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

/* DOCTOR DASHBOARD PAGE (HOME) */
export function DDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-4xl font-bold my-6">Doctor Dashboard</h1>

      {/* Quick cards for navigation */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* My Profile card */}
        <div
          onClick={() => navigate("profile")}
          className="bg-blue-200 p-6 rounded-lg shadow text-center cursor-pointer hover:shadow-lg transition"
        >
          <FaUserDoctor className="text-4xl mx-auto mb-2 text-blue-700" />
          <h2 className="text-lg font-semibold">My Profile</h2>
        </div>

        {/* My Appointments card */}
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
export function DProfile() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h2>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl flex gap-10 items-start border">
        {/* Doctor profile image */}
        <img
          src="https://plus.unsplash.com/premium_photo-1664476459351-59625a0fef11?q=80&w=687&auto=format&fit=crop"
          alt="Doctor"
          className="w-44 h-44 rounded-full object-cover border-4 border-blue-300 shadow"
        />

        {/* Doctor information */}
        <div className="space-y-4 text-gray-700">
          <p className="text-xl font-semibold text-gray-900">Dr. John Smith</p>
          <p className="text-blue-600 font-medium">Cardiologist</p>

          <div className="border-t pt-4 space-y-2">
            <p><span className="font-semibold">Email:</span> johnsmith@email.com</p>
            <p><span className="font-semibold">Phone:</span> +91 9876543210</p>
            <p><span className="font-semibold">Experience:</span> 8 Years</p>
            <p><span className="font-semibold">Hospital:</span> Cureonix Hospital</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* APPOINTMENTS PAGE */
export function Appointments() {
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  // Update status of an appointment (Approved / Rejected)
  const updateStatus = (index, status) => {
    const updated = [...appointments];
    updated[index].status = status;
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated)); // persist changes
  };

  // Quick stats
  const total = appointments.length;
  const completed = appointments.filter(a => a.status === "Approved").length;
  const pending = appointments.filter(a => !a.status).length;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Appointments" value={total} />
        <StatCard title="Completed" value={completed} />
        <StatCard title="Pending" value={pending} />
      </div>

      {/* Appointments table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-3">Patient</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Treatment</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">City</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{a.patientName}</td>
                <td className="p-3">{a.contact}</td>
                <td className="p-3">{a.doctor}</td>
                <td className="p-3">{a.treatment}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.time}</td>
                <td className="p-3">{a.city}</td>

                {/* Status display */}
                <td className="p-3">
                  {a.status ? a.status : "Pending"}
                </td>

                {/* Approve / Reject buttons */}
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => updateStatus(i, "Approved")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(i, "Rejected")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* STAT CARD COMPONENT */
export function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl text-blue-600 font-bold">{value}</p>
    </div>
  );
}