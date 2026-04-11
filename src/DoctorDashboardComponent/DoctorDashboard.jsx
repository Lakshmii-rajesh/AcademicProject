import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaFileAlt, FaUserMd } from "react-icons/fa";
import { FaUserDoctor, FaClipboardList } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { useSpring, animated } from "@react-spring/web";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import DoctorSidebar from "./DoctorSidebar";
import { FiLogOut } from "react-icons/fi";

export default function DoctorDashboard() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

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
    <motion.div
      className="min-h-screen bg-[#f3f4f6] flex flex-col overflow-x-hidden"
    >
      <Toaster position="top-right" />

      {/* ✅ NAVBAR */}
      <div className="bg-blue-500 flex justify-end items-center px-6 h-16 shadow-sm sticky top-0 z-50">
        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow"
          >
            <IoPerson className="text-blue-600 text-xl" />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg p-2 z-50"
              >
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded"
                  onClick={() => {
                    toast.success("Logged out 👋");
                    setTimeout(() => (window.location.href = "/"), 1000);
                  }}
                >
                  <FiLogOut />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ MAIN CONTENT AREA */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <DoctorSidebar
          isCollapsed={sidebarCollapsed}
          toggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 transition-all duration-300 p-8 min-h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </motion.div>
  );
}

/* NOTE FOR GRAPHS: 
  Inside your child components (DDashboard, etc.), 
  wrap your AreaChart/ResponsiveContainer in a div with a set height:
  
  <div className="h-[300px] w-full bg-white p-4 rounded-[2.5rem] shadow-sm">
     <ResponsiveContainer width="100%" height="100%">
        <AreaChart ... />
     </ResponsiveContainer>
  </div>
*/
/* LOADER */
function SkeletonLoader() {
  return (
    <div className="grid gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-24 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}


export function DDashboard() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "Loading...",
    email: "Loading...",
    specialization: "Loading..."
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;
        if (!email) return;

        const res = await axios.get(
          `https://localhost:7077/api/AddDoctors/DoctorByEmail/${email}`
        );
        const data = res.data;
        setDoctor({
          name: data.name || data.doctorName,
          email: data.email,
          specialization: data.specialization
        });
      } catch (err) {
        console.error("Error fetching doctor:", err);
      }
    };
    fetchDoctor();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* ✅ Welcome Card: Now taking full width (w-full) with no max-width constraint */}
      <div className="bg-blue-400 p-6 rounded-[2.5rem] shadow-sm flex items-center gap-6 w-full">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
          <IoPerson className="text-blue-700 text-3xl" />
        </div>
        <div>
          <p className="text-white text-xs font-bold uppercase tracking-widest opacity-90">Doctor Name</p>
          <h2 className="text-2xl font-black text-black">
            Dr. {doctor.name}
          </h2>
          <p className="text-blue-800 font-semibold text-sm">{doctor.specialization}</p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile */}
        <div
          onClick={() => navigate("profile")}
          className="bg-[#93C5FD] p-6 rounded-[2.5rem] shadow-sm flex items-center gap-5 cursor-pointer hover:scale-[1.02] transition-transform"
        >
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <FaUserDoctor className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest">Section</p>
            <h2 className="text-xl font-black text-black">My Profile</h2>
          </div>
        </div>

        {/* Appointments */}
        <div
          onClick={() => navigate("appointments")}
          className="bg-[#93C5FD] p-6 rounded-[2.5rem] shadow-sm flex items-center gap-5 cursor-pointer hover:scale-[1.02] transition-transform"
        >
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <FaClipboardList className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest">Section</p>
            <h2 className="text-xl font-black text-black">My Appointments</h2>
          </div>
        </div>
      </div>
    </div>
  );
}


/* PROFILE PAGE */
export function DProfile() {
  const [doctor, setDoctor] = useState({
    name: "Loading...",
    specialization: "Loading...",
    fees: "Loading...",
    contact: "Loading...",
    email: "Loading...",
    password: "Loading...",
    image:
      "https://plus.unsplash.com/premium_photo-1664476459351-59625a0fef11?q=80&w=687&auto=format&fit=crop",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const email =
          user.email ||
          user.Email ||
          localStorage.getItem("userEmail");

        console.log("EMAIL:", email);

        if (!email) {
          console.log("No email found in localStorage");
          return;
        }

        const res = await axios.get(
          `https://localhost:7077/api/AddDoctors/DoctorByEmail/${email}`
        );

        console.log("API RESPONSE:", res.data);

        const data = res.data;

        setDoctor({
          name: data.doctorName || data.DoctorName,
          specialization: data.specialization || data.Specialization,
          fees: data.fee || data.Fee,
          contact: data.contact || data.Contact,
          email: data.email || data.Email,
          image: data.image || data.Image,
        });

      } catch (err) {
        console.error("API ERROR:", err);
      }
    };

    fetchDoctor();
  }, []);
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

          {/* Name */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {doctor.name}
            </h3>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <InfoField label="Specialization" value={doctor.specialization} />
            <InfoField label="Fees" value={doctor.fees} />
            <InfoField label="Contact" value={doctor.contact} />
            <InfoField label="Email" value={doctor.email} />


          </div>

        </div>
      </div>
    </>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="bg-[#93C5FD] p-5 rounded-[2rem] shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
      <div>
        <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="font-black text-black text-lg">{value}</p>
      </div>
    </div>
  );
}

/* APPOINTMENTS PAGE */

import { FaSearch, FaTrash } from "react-icons/fa";


export function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    fetchAppointments();
  }, []);

  // FETCH
  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const email =
        user?.email || localStorage.getItem("userEmail");

      const url = `https://localhost:7077/api/BookAppointment/GetByDoctorSpecialization/${encodeURIComponent(email)}`;

      const res = await axios.get(url);

      let data = [];

      if (Array.isArray(res.data)) data = res.data;
      else if (res.data?.$values) data = res.data.$values;
      else if (res.data?.data) data = res.data.data;

      setAppointments(data || []);

      toast.success("Appointments Loaded ✅");
    } catch (err) {
      console.error("FETCH ERROR:", err);
      toast.error("Failed to load appointments ❌");
      setAppointments([]);
    }
  };

  // STATUS UPDATE
  const updateStatus = (id, status) => {
    const appointment = appointments.find((a) => a.id === id);

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
            ...a,
            status: status === "Rejected" ? "Rejected" : "Accepted",
          }
          : a
      )
    );

    // ACCEPT
    if (status === "Accepted" && appointment) {
      toast.success("Appointment Accepted ✅");

      let message = `Hello,

Your appointment is CONFIRMED ✅

Patient: ${appointment.patientName}
Date: ${appointment.appointmentDate?.split("T")[0]}
Time: ${appointment.timeSlot}`;

      window.open(
        `https://wa.me/91${appointment.contactNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }

    // REJECT
    if (status === "Rejected" && appointment) {
      axios
        .delete(
          `https://localhost:7077/api/BookAppointment/DeleteAppointment?id=${id}`
        )
        .then(() => {
          setAppointments((prev) =>
            prev.filter((a) => a.id !== id)
          );

          toast.error("Appointment Rejected ❌");

          let message = `Hello,

Your appointment has been CANCELLED ❌

Patient: ${appointment.patientName}`;

          window.open(
            `https://wa.me/91${appointment.contactNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        })
        .catch((err) => {
          console.error("DELETE ERROR:", err);
          toast.error("Failed to reject ❌");
        });
    }
  };

  // SEARCH
  const filteredAppointments = appointments.filter((a) =>
    (a?.patientName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // PAGINATION
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;

  const currentAppointments = filteredAppointments.slice(
    start,
    start + itemsPerPage
  );

  // STATS (UNIQUE 🔥)
  const total = appointments.length;
  const accepted = appointments.filter(a => a.status === "Accepted").length;
  const pending = appointments.filter(a => !a.status || a.status === "Pending").length;

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-blue-600"
        >
          Appointments
        </motion.h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard title="Total" value={total} />
          <StatCard title="Accepted" value={accepted} />
          <StatCard title="Pending" value={pending} />
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >
          <table className="w-full text-left">

            <thead className="bg-slate-50 text-sm">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Reason</th>
                <th className="p-3">City</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentAppointments.length > 0 ? (
                currentAppointments.map((a, index) => (
                  <motion.tr
                    key={a.id || index}
                    whileHover={{ scale: 1.01 }}
                    className="border-t"
                  >
                    <td className="p-3 font-medium">{a.patientName || "-"}</td>
                    <td className="p-3">{a.contactNumber || "-"}</td>
                    <td className="p-3">{a.reason || "-"}</td>
                    <td className="p-3">{a.city || "-"}</td>

                    <td className="p-3">
                      {a.appointmentDate
                        ? a.appointmentDate.split("T")[0]
                        : "-"}
                    </td>

                    <td className="p-3">{a.timeSlot || "-"}</td>

                    {/* STATUS */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        ${a.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : a.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {a.status || "Pending"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => updateStatus(a.id, "Accepted")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm shadow"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(a.id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm shadow"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-slate-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </motion.div>
      </div>
    </div>
  );
}

/* 🔥 STAT CARD */
function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-4 rounded-2xl shadow border"
    >
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </motion.div>
  );
}