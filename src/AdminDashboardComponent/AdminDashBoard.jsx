import React, { useState, useEffect, useRef } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { FaUserInjured } from "react-icons/fa";
import AddDoctor from "./AddDoctor";
import SidebarMenu from "./SidebarMenu";
import { Link, Outlet } from "react-router-dom";
import { FaSearch, FaRegClock, FaRegCalendarAlt, FaTrash, FaBars } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserMd,
  FaClipboardList,
  FaFileAlt,
  FaHome,
  FaUser,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashBoard() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div
        className={`bg-blue-400 flex justify-between items-center px-6 h-16 shadow transition-all duration-300 ${sidebarCollapsed ? "ml-24" : "ml-70"
          }`}
      >
        <div />

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 cursor-pointer bg-white p-2 rounded-full border shadow-sm"
          >
            <IoPerson className="text-blue-600 text-xl" />
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-28 bg-white rounded-xl shadow-xl">
              <button
                className="w-full text-left px-5 py-3 hover:bg-slate-50 text-sm"
                onClick={() => (window.location.href = "/login")}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Layout */}
      <div className="flex">
        <SidebarMenu
          isCollapsed={sidebarCollapsed}
          toggleCollapse={() =>
            setSidebarCollapsed((prev) => !prev)
          }
        />

        <div
          className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-24" : "ml-70"
            }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}


// ================= Dashboard  =================
export function ADashboard() {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Colors controlled here
  const stats = [
    {
      title: "Total Doctors",
      value: "24",
      icon: <HiUserGroup className="text-blue-500 text-4xl" />,
      color: "bg-blue-400 border-blue-200",
      link: "/doctors"
    },
    {
      title: "Total Patients",
      value: "1,245",
      icon: <FaUserInjured className="text-blue-500 text-4xl" />,
      color: "bg-blue-400 border-blue-200",
      link: "/patients"
    },
    {
      title: "Active Appointments",
      value: "38",
      icon: <FaFileAlt className="text-blue-500 text-4xl" />,
      color: "bg-blue-400 border-blue-200",
      link: "/appointments"
    }
  ];

  const weeklyData = [
    { name: "Mon", appointments: 12 },
    { name: "Tue", appointments: 19 },
    { name: "Wed", appointments: 15 },
    { name: "Thu", appointments: 22 },
    { name: "Fri", appointments: 10 },
    { name: "Sat", appointments: 35 },
    { name: "Sun", appointments: 20 }
  ];

  const monthlyData = [
    { name: "Jan", appointments: 145 },
    { name: "Feb", appointments: 190 },
    { name: "Mar", appointments: 160 },
    { name: "Apr", appointments: 210 },
    { name: "May", appointments: 180 },
    { name: "Jun", appointments: 240 },
    { name: "Jul", appointments: 290 }
  ];

  return (
    <div className="md:py-2 px-4 min-h-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">

        <div>
          <h1 className="text-3xl font-black text-blue-600 tracking-tight">
            System Administration
          </h1>
        </div>



      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {stats.map(function (stat, index) {

          return (
            <Link
              key={index}
              to={stat.link}
              className={
                "flex items-center justify-between p-6 rounded-2xl border " +
                stat.color +
                " hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              }
            >
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  {stat.title}
                </p>
                <h3 className="text-4xl font-black text-black">
                  {stat.value}
                </h3>
              </div>

              <div className="p-4 bg-white backdrop-blur-sm rounded-2xl shadow-sm">
                {stat.icon}
              </div>

            </Link>
          );

        })}

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm  md:p-4">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Weekly Appointments
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWeekly)" activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm md:p-4">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Monthly Appointments
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="appointments" fill="url(#colorMonthly)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}


// ================= Manage Users =================
export function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API = "https://localhost:7077/api/Regester/GetPatients";

  useEffect(() => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => {
        setUsers(res.data || []);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load patients. Please try again later.");
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Transform and filter data from API
  const filteredPatients = users
    .map((user, index) => ({
      id: user.id || user.Id || index,
      name: user.name || user.Name || "-",
      email: user.email || user.Email || "-",
      mobile: user.phone || user.Phone || user.mobileNumber || user.mobile || "-",
    }))
    .filter(
      p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mobile.includes(searchQuery)
    );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculations
  const totalItems = filteredPatients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-2 md:p-6 min-h-full relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-blue-600 tracking-tight">
            Patient Records
          </h1>
        </div>

        <div className="relative w-full md:w-auto">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Patient List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-slate-200">
                  Patient Details
                </th>
                <th className="p-4 font-bold border-b border-slate-200">
                  Contact Number
                </th>
                <th className="p-4 font-bold border-b border-slate-200">
                  Email
                </th>
                <th className="p-4 font-bold border-b border-slate-200 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-slate-500 font-medium">
                    Loading patients...
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-8 text-slate-500 font-medium"
                  >
                    {users.length === 0 ? "No patients found." : "No patients found matching your search."}
                  </td>
                </tr>
              ) : (
                currentPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                          <FaUser className="text-indigo-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {patient.name}
                          </p>
                          <p className="text-xs font-medium text-slate-500">
                            ID: {patient.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-700">
                        {patient.mobile}
                      </p>
                    </td>
                    <td>
                      <p className="text-sm font-medium text-slate-600">
                        {patient.email}
                      </p>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPatient(patient);
                        }}
                        className="opacity-70 hover:opacity-100 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white p-2 rounded-lg transition-all shadow-sm"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600 gap-4 bg-slate-50 mt-0 rounded-b-2xl">
          <div className="text-slate-600 font-medium">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} patients
          </div>
          <div className="flex gap-2 mx-auto sm:mx-0">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 min-w-16 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 min-w-8 rounded-lg border font-bold shadow-sm transition-all duration-300 ${currentPage === page
                  ? 'border-slate-600 bg-slate-600 text-white transform scale-105'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 min-w-16 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedPatient(null)}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden transform transition-all translate-y-0 scale-100 duration-300 ease-out flex flex-col">
            {/* Modal Cover Image / Gradient */}
            <div className="h-36 bg-linear-to-br from-blue-500 via-indigo-600 to-indigo-800 relative">
              <button
                onClick={() => setSelectedPatient(null)}
                className="absolute top-4 right-4 text-white hover:text-red-300 bg-white/20 hover:bg-white/30 p-2.5 rounded-full backdrop-blur-md transition-all z-20 shadow-sm"
                title="Close"
              >
                <FaTimes size={14} />
              </button>

              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 rounded-full -translate-x-8 translate-y-8 blur-xl"></div>

              <div className="absolute bottom-0 w-full h-1/2 bg-linear-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Profile Avatar & Header */}
            <div className="relative px-6 flex flex-col items-center -mt-15 z-10 pb-2">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-xl overflow-hidden mb-4 group hover:scale-105 transition-transform duration-300">
                {selectedPatient.image ? (
                  <img
                    src={selectedPatient.image}
                    alt={selectedPatient.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
                    <FaUser className="text-indigo-400 text-6xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
              </div>

              <h2 className="text-3xl font-black text-slate-800 text-center tracking-tight mb-2 leading-tight">
                {selectedPatient.name}
              </h2>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-5 py-1.5 rounded-full shadow-sm">
                <FaUser className="text-blue-500 text-sm" />
                <span className="text-sm font-bold text-blue-700 tracking-wide uppercase">
                  ID: {selectedPatient.id}
                </span>
              </div>
            </div>

            {/* Modal Content / Info Cards */}
            <div className="px-8 pb-8 pt-4 space-y-4">
              <div className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                  <span className="font-bold text-xl">@</span>
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-bold text-slate-800 truncate leading-tight group-hover:text-blue-600 transition-colors">
                    {selectedPatient.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                  <span className="font-bold text-xl">#</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Phone Number
                  </p>
                  <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                    {selectedPatient.mobile}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-center pb-8 pb-safe">
              <button
                onClick={() => setSelectedPatient(null)}
                className="w-full py-4 bg-slate-800 hover:bg-black text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:shadow-md tracking-wide"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ================= Manage Doctors =================
export function ManageDoctors() {
  return (
    <div className="p-3">
      <AddDoctor />
    </div>
  );
}


// ================= Appointments =================
export function AppointmentsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH FROM API
  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://localhost:7077/api/BookAppointment/GetAppointments"
      );
      const rawData = Array.isArray(res.data) ? res.data : [];

      const data = rawData.map((appt) => ({
        id:
          appt.id ||
          appt.Id ||
          appt.appointmentId ||
          appt.appointmentID ||
          appt.AppointmentId ||
          "",
        patient:
          appt.patientName ||
          appt.PatientName ||
          appt.patient ||
          appt.Patient ||
          (typeof appt.patient === "object"
            ? appt.patient?.name || appt.patient?.Name
            : appt.patient) ||
          (typeof appt.Patient === "object"
            ? appt.Patient?.name || appt.Patient?.Name
            : appt.Patient) ||
          "-",
        doctor:
          appt.doctorName ||
          appt.DoctorName ||
          appt.doctor ||
          appt.Doctor ||
          appt.assignedDoctor ||
          appt.assignedDoctorName ||
          (typeof appt.doctor === "object"
            ? appt.doctor?.name || appt.doctor?.Name
            : appt.doctor) ||
          (typeof appt.Doctor === "object"
            ? appt.Doctor?.name || appt.Doctor?.Name
            : appt.Doctor) ||
          "-",
        department:
          appt.specialization ||
          appt.Specialization ||
          appt.specialisation ||
          appt.Specialisation ||
          appt.department ||
          appt.Department ||
          appt.service ||
          appt.reason ||
          (typeof appt.specialization === "object"
            ? appt.specialization?.name || appt.specialization?.Name
            : appt.specialization) ||
          (typeof appt.Specialization === "object"
            ? appt.Specialization?.name || appt.Specialization?.Name
            : appt.Specialization) ||
          (typeof appt.department === "object"
            ? appt.department?.name || appt.department?.Name
            : appt.department) ||
          (typeof appt.Department === "object"
            ? appt.Department?.name || appt.Department?.Name
            : appt.Department) ||
          "-",
        date:
          appt.appointmentDate ||
          appt.date ||
          appt.AppointmentDate ||
          appt.AppointmentDate ||
          "-",
        time:
          appt.timeSlot ||
          appt.appointmentTime ||
          appt.AppointmentTime ||
          appt.time ||
          appt.slot ||
          "-",
        status: appt.status || appt.Status || appt.appointmentStatus || "Pending",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
      }));

      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid appointment ID");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    try {
      await axios.delete(
        `https://localhost:7077/api/BookAppointment/DeleteAppointment?id=${id}`
      );
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete appointment.");
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      appt.patient.toLowerCase().includes(query) ||
      appt.doctor.toLowerCase().includes(query) ||
      appt.department.toLowerCase().includes(query) ||
      (appt.date && appt.date.toString().toLowerCase().includes(query));

    const matchesFilter = filter === "All" || appt.status === filter;

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  // const statusColor = (status) => {
  //   if (status === "Completed")
  //     return "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm";
  //   if (status === "Cancelled")
  //     return "bg-rose-50 text-rose-700 border-rose-200 shadow-sm";
  //   return "bg-amber-50 text-amber-700 border-amber-200 shadow-sm";
  // };

  // const statusDotColor = (status) => {
  //   if (status === "Completed")
  //     return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse";
  //   if (status === "Cancelled")
  //     return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]";
  //   return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse";
  // };

  const totalItems = filteredAppointments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <div className="p-6 bg-blue-50/30 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-950 tracking-tight">Appointment History</h1>
            <p className="text-blue-500 mt-1">Manage and view all patient appointments</p>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden transform transition-all duration-500 hover:shadow-lg">
          {/* Header Controls */}
          <div className="p-5 border-b border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-sm">
            <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar px-1 py-1">
              {['All', 'Pending', 'Completed', 'Cancelled'].map(f => {
                let activeColor = 'bg-blue-600 text-white border-blue-700';
                if (f === 'Completed') activeColor = 'bg-emerald-500 text-white border-emerald-600';
                if (f === 'Cancelled') activeColor = 'bg-rose-500 text-white border-rose-600';
                if (f === 'Pending') activeColor = 'bg-amber-500 text-white border-amber-600';

                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${filter === f
                      ? `${activeColor} shadow-md transform scale-105`
                      : 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 hover:border-blue-300 hover:shadow transform hover:-translate-y-0.5'
                      }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64 md:w-80 group">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search patient or doctor..."
                className="w-full pl-10 pr-4 py-2 bg-blue-50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-300 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/80 border-b border-blue-100 text-blue-600 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Patient Info</th>
                  <th className="px-6 py-4 font-bold">Date & Time</th>
                  <th className="px-6 py-4 font-bold">Doctor</th>
                  <th className="px-6 py-4 font-bold">Department</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {currentAppointments.length > 0 ? (
                  currentAppointments.map((app, index) => (
                    <tr key={app.id} className="hover:bg-blue-50/60 transition-colors duration-300 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={app.image} alt={app.patient} className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 bg-blue-50 group-hover:border-blue-300 transition-colors duration-300" />
                          <div>
                            <p className="font-semibold text-blue-950 group-hover:text-blue-700 transition-colors duration-300">{app.patient}</p>
                            <p className="text-xs text-blue-400 mt-0.5">ID: #APT-{app.id.toString().padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-sm text-blue-800">
                            <FaRegCalendarAlt className="text-blue-400 group-hover:text-blue-500 transition-colors" />
                            <span>
                              {new Date(app.date).toLocaleDateString("en-GB")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-500">
                            <FaRegClock className="text-blue-400 group-hover:text-blue-500 transition-colors" />
                            <span>{app.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-blue-900">{app.doctor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-50/50 border border-blue-100 text-blue-700 rounded-md text-xs font-bold inline-block">
                          {app.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-1">
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-2 text-blue-300 hover:text-blue-700 hover:bg-white hover:border-blue-200 border border-transparent rounded-full shadow-sm hover:shadow transition-all duration-300 focus:outline-none"
                            aria-label="Delete appointment"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-blue-500">
                      <div className="flex flex-col items-center justify-center gap-3 animate-[fadeIn_0.5s_ease-out]">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-1">
                          <FaSearch className="text-blue-300 text-xl" />
                        </div>
                        <p className="text-lg font-bold text-blue-800">No appointments found</p>
                        <p className="text-sm text-blue-400 max-w-sm mx-auto">We couldn't find any appointments matching your current search or filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between text-sm text-blue-600 gap-4 bg-blue-50/30">
            <div className="flex gap-2 mx-auto sm:mx-0 sm:ml-auto">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 min-w-16 rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 min-w-8 rounded-lg border font-bold shadow-sm transition-all duration-300 ${currentPage === page
                    ? 'border-blue-600 bg-blue-600 text-white transform scale-105'
                    : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 min-w-16 rounded-lg border border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= New Queries =================
export function NewQueries() {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  const fetchQueries = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7077/api/ContactMessage/getmessages"
      );
      setQueries(res.data);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError("Failed to load queries. Please try again later.");
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid Id, cannot delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      await axios.delete(
        `https://localhost:7077/api/ContactMessage/delete/${id}`
      );
      setQueries((prev) => prev.filter((q) => q.id !== id));
      alert("Query deleted successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(
        err.response?.data?.message || "Failed to delete query. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">🩺 New Queries</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {queries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((q) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{q.name}</h3>
                <span className="text-gray-400 text-sm">
                  {new Date(q.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {q.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Mobile:</span> {q.mobileNumber}
              </p>
              <p className="text-gray-700 mt-2">{q.message}</p>

              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(q.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No queries found.</p>
      )}
    </div>
  );
}