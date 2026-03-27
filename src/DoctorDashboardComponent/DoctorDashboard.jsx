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
                onClick={() => (window.location.href = "/")}
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
  const [edit, setEdit] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "Dr. John Smith",
    specialization: "Cardiologist",
    fees: "500",
    contact: "+91 9876543210",
    email: "johnsmith@email.com",
    password: "12345678",
    image:
      "https://plus.unsplash.com/premium_photo-1664476459351-59625a0fef11?q=80&w=687&auto=format&fit=crop",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDoctor({ ...doctor, image: imageUrl });
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border">

        {/* Top Banner */}
        <div className="h-24 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300"></div>

        <div className="p-6">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={doctor.image}
              alt="Doctor"
              className="w-28 h-28 rounded-full border-4 border-white shadow object-cover -mt-14"
            />
          </div>

          {/* Upload Image */}
          {edit && (
            <div className="mt-4 text-center">
              <input type="file" onChange={handleImageUpload} />
            </div>
          )}

          {/* Name */}
          <div className="text-center mt-4">
            {edit ? (
              <input
                value={doctor.name}
                onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
            ) : (
              <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <InfoField
              label="Specialization"
              value={doctor.specialization}
              edit={edit}
              onChange={(val) => setDoctor({ ...doctor, specialization: val })}
            />

            <InfoField
              label="Fees"
              value={doctor.fees}
              edit={edit}
              onChange={(val) => setDoctor({ ...doctor, fees: val })}
            />

            <InfoField
              label="Contact"
              value={doctor.contact}
              edit={edit}
              onChange={(val) => setDoctor({ ...doctor, contact: val })}
            />

            <InfoField
              label="Email"
              value={doctor.email}
              edit={edit}
              onChange={(val) => setDoctor({ ...doctor, email: val })}
            />

            <InfoField
              label="Password"
              value={doctor.password}
              edit={edit}
              onChange={(val) => setDoctor({ ...doctor, password: val })}
            />

          </div>

          {/* Button */}
          <button
            onClick={() => setEdit(!edit)}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
          >
            {edit ? "Save Profile" : "Edit Profile"}
          </button>

        </div>
      </div>
    </>
  );
}

/* Reusable Field */
function InfoField({ label, value, edit, onChange }) {
  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{label}</p>
      {edit ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      ) : (
        <p className="font-semibold">{value}</p>
      )}
    </div>
  );
}

/* APPOINTMENTS PAGE */

import { FaSearch, FaTrash } from "react-icons/fa";

export function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...appointments];
    updated[index].status = status;
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const deleteAppointment = (index) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch = a.patientName?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Pending"
        ? !a.status
        : a.status === filter;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Appointments</h1>
            <p className="text-gray-500 mt-1">Manage and view all patient appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

          {/* Filter + Search */}
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">

            <div className="flex gap-2 flex-wrap">
              {["All", "Approved", "Rejected", "Pending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    filter === f
                      ? "bg-blue-100 text-blue-600 border border-blue-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-500 text-xs uppercase">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">City</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentAppointments.length > 0 ? (
                  currentAppointments.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 border-b">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={a.image || "https://randomuser.me/api/portraits/men/32.jpg"}
                            alt="patient"
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <p className="font-semibold text-gray-800">{a.patientName}</p>
                        </div>
                      </td>

                      <td className="px-6 py-4">{a.contact}</td>
                      <td className="px-6 py-4">{a.date}</td>
                      <td className="px-6 py-4">{a.time}</td>
                      <td className="px-6 py-4">{a.city}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            a.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : a.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {a.status ? a.status : "Pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => updateStatus(start + i, "Approved")}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => updateStatus(start + i, "Rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Reject
                          </button>

                          <button
                            onClick={() => deleteAppointment(start + i)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
  );
}