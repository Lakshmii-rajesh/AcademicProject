import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaUser, FaHeartbeat, FaNotesMedical, FaUserMd, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTint } from "react-icons/fa";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes} from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import PatientSidebar from "./PatientSidebar";
const BASE_URL = "https://localhost:7077/api";
const DOCTOR_API = "https://localhost:7077/api/AddDoctors";

/* ===================== MAIN LAYOUT ===================== */
import { FiLogOut } from "react-icons/fi";

export default function PatientDashboard() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f4f7fb] text-slate-800"
    >
      <Toaster position="top-right" />

      {/* 🔵 NAVBAR */}
      
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full flex justify-between items-center px-6 h-16 bg-linear-to-r from-blue-500 to-blue-600 text-white shadow"
      >
        {/* ✅ LEFT SIDE */}
        <div className="flex items-center gap-4">
          
          

          {/* TITLE */}
          <h1 className="text-xl font-bold tracking-wide">Cureonix</h1>
        </div>

        {/* ✅ RIGHT SIDE */}
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
                className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg p-2"
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
      </motion.div>

      {/* 🔵 SIDEBAR + CONTENT */}
      <div className="flex">
              <PatientSidebar
                isCollapsed={sidebarCollapsed}
                toggleCollapse={() =>
                  setSidebarCollapsed((prev) => !prev)
                }
              />
      
              <div
                className={`flex-1 transition-all duration-300 ${
                  sidebarCollapsed ? "translate-x-24" : "translate-x-0"
                }`}
              >
                <Outlet />
              </div>
            </div>

      {/* 🔵 FLOAT BACK BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6"
      >
        <button
          onClick={() => (window.location.href = "/")}
          className="px-5 py-3 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          ← Back
        </button>
      </motion.div>
    </motion.div>
  );
}
/* ===================== SIDEBAR ITEM ===================== */
function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "."}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl mx-2 text-sm transition-all duration-200
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}
/* ===================== DASHBOARD ===================== */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
export function PDashboard() {
  const navigate = useNavigate();

  const [patientInfo, setPatientInfo] = useState({
    name: "Loading...",
    email: "Loading...",
    phone: "Loading..."
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;

        if (!email) return;

        const res = await axios.get(
          `https://localhost:7077/api/Regester/PatientByEmail/${email}`
        );

        const data = res.data;

        setPatientInfo({
          name: data.name,
          email: data.email,
          phone: data.phone
        });

      } catch (err) {
        console.error("Error fetching patient info:", err);
      }
    };

    fetchPatient();
  }, []);

  return (
    <div className="md:py-2 px-4 min-h-full space-y-8">

      
      {/* WELCOME CARD (match admin gradient + glow) */}
      <div className="relative overflow-hidden rounded-2xl p-6 shadow-sm border border-blue-200 bg-linear-to-r from-blue-400 via-blue-500 to-blue-600 text-white">

        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-12 -translate-y-12 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 rounded-full -translate-x-8 translate-y-8 blur-xl"></div>

        <h2 className="text-2xl font-black">
          Welcome {patientInfo.name}
        </h2>

        <p className="text-blue-100 mt-1 font-medium">
          Here is your health summary
        </p>
      </div>

      {/* PATIENT DETAILS (match admin cards) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">

        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Patient Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-blue-200 bg-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FaUser className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Name
              </p>
              <p className="font-black text-black text-lg">
                {patientInfo.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-blue-200 bg-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <MdEmail className="text-indigo-500 text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Email
              </p>
              <p className="font-black text-black text-lg">
                {patientInfo.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl border border-blue-200 bg-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <MdPhone className="text-emerald-500 text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Phone
              </p>
              <p className="font-black text-black text-lg">
                {patientInfo.phone}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* HEALTH SECTION (match admin card style) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">

        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FaHeartbeat className="text-red-500" />
          Health Tips & Reminders
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-4">

            <div className="p-4 rounded-xl hover:bg-blue-50 transition">
              <p className="font-bold text-slate-800">💧 Stay Hydrated</p>
              <p className="text-sm text-slate-500">
                Drink at least 8 glasses of water daily.
              </p>
            </div>

            <div className="p-4 rounded-xl hover:bg-blue-50 transition">
              <p className="font-bold text-slate-800">🩺 Regular Check-ups</p>
              <p className="text-sm text-slate-500">
                Visit doctor every 6–12 months.
              </p>
            </div>

            <div className="p-4 rounded-xl hover:bg-blue-50 transition">
              <p className="font-bold text-slate-800">🥗 Healthy Diet</p>
              <p className="text-sm text-slate-500">
                Eat fruits, vegetables and balanced meals.
              </p>
            </div>

          </div>

          <div className="space-y-4">

            <div className="p-4 rounded-xl hover:bg-blue-50 transition">
              <p className="font-bold text-slate-800">🏃 Exercise</p>
              <p className="text-sm text-slate-500">
                30 minutes daily walking or workout.
              </p>
            </div>

            <div className="p-4 rounded-xl hover:bg-blue-50 transition">
              <p className="font-bold text-slate-800">🚑 Emergency</p>
              <p className="text-sm text-slate-500">
                Ambulance: 108 | Police: 100
              </p>
            </div>

            <div className="p-4 rounded-xl hover:bg-blue-50 transition">
              <p className="font-bold text-slate-800">🧠 Mental Health</p>
              <p className="text-sm text-slate-500">
                Take breaks and reduce stress.
              </p>
            </div>

          </div>

        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-700 font-bold">
            Reminder: Healthy lifestyle = Better life 💙
          </p>
        </div>

      </div>

      {/* ACTION BUTTONS (match admin hover style) */}
      <div className="flex gap-4">

        <button
          onClick={() => navigate("book")}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          Book Appointment
        </button>

        <Link
          to="profile"
          className="px-6 py-3 rounded-xl bg-green-500 text-white font-bold shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          View Profile
        </Link>

      </div>

    </div>
  );
}
// 👉 IF IMAGE IS IN SRC/ASSETS → USE THIS
// import bgImage from "../assets/bookappointmentImage.png";
export function BookAppointment() {
  const BASE_URL = "https://localhost:7077/api";

  const [appointments, setAppointments] = useState([]);

  const [patientName, setPatientName] = useState("");
  const [contact, setContact] = useState("");
  const [treatment, setTreatment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [doctors, setDoctors] = useState([]);

  // ================= FETCH DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/AddDoctors`);

        const normalized = (res.data || []).map((d) => ({
          id: d.id || d.Id,
          doctorName: d.doctorName || d.DoctorName,
          specialization: d.specialization || d.Specialization,
        }));

        setDoctors(normalized);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  // ================= AUTO SELECT DOCTOR =================
  useEffect(() => {
    if (treatment) {
      const filtered = doctors.filter(
        (doc) =>
          doc.specialization?.toLowerCase() ===
          treatment.toLowerCase()
      );

      setDoctor(filtered.length > 0 ? filtered[0].doctorName : "");
    } else {
      setDoctor("");
    }
  }, [treatment, doctors]);

  // ================= BOOK =================
  const handleBook = async () => {
    if (!patientName || !contact || !doctor || !treatment || !date || !time || !city) {
      toast.error("Fill all fields 😑");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) {
      toast.error("User not logged in");
      return;
    }

    const newAppointment = {
      patientName,
      contactNumber: contact,
      doctorName: doctor,
      reason: treatment,
      Specialization: treatment,
      appointmentDate: date,
      timeSlot: time,
      city,
      email: user.email,
    };

    try {
      await axios.post(
        `${BASE_URL}/BookAppointment/BookAppointment`,
        newAppointment
      );

      toast.success("Appointment Booked 🎉");

      setAppointments((prev) => [...prev, { ...newAppointment, status: "Pending" }]);

      // RESET
      setPatientName("");
      setContact("");
      setTreatment("");
      setDoctor("");
      setCity("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed ❌");
    }
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.specialization?.toLowerCase() ===
      treatment?.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <Toaster position="top-right" />

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Book Your Appointment</h2>
          <p className="text-gray-600">Schedule your visit with our expert doctors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Name */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <div className="relative">
              <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your phone"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>

          {/* Treatment */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Type</label>
            <div className="relative">
              <FaNotesMedical className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              >
                <option value="">Select Treatment</option>
                <option>Dental</option>
                <option>Cardiology</option>
                <option>Eye</option>
                <option>Orthopedic</option>
                <option>Neurology</option>
                <option>Dermatology</option>
                <option>ENT</option>
                <option>Gynecology</option>
                <option>Pediatrics</option>
                <option>General Medicine</option>
              </select>
            </div>
          </div>

          {/* Doctor */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
            <div className="relative">
              <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.doctorName}>
                      {doc.doctorName} ({doc.specialization})
                    </option>
                  ))
                ) : (
                  <option>No doctors available</option>
                )}
              </select>
            </div>
          </div>

          {/* City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select City</option>
                <option>Bangalore</option>
                <option>Mysore</option>
                <option>Mangalore</option>
                <option>Hubli</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={date}
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                onChange={(e) => {
                  const selected = new Date(e.target.value);

                  if (selected.getDay() === 0) {
                    toast.error("No Sunday booking 🚫");
                    setDate("");
                    return;
                  }

                  setDate(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Time */}
          <div className="relative md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Select Time</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleBook}
          className="w-full mt-8 bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Confirm Appointment 🚀
        </motion.button>
      </motion.div>
    </div>
  );
}
/* ================= REUSABLE INPUT ================= */
function Input({ value, setValue, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
    />
  );
}
/* ================= REUSABLE SELECT ================= */
function Select({ value, setValue, children }) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
    >
      {children}
    </select>
  );
}
// Appointment History Component
export function AppointmentHistoryPatient() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-slate-100 to-teal-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-8 text-slate-800 animate-fadeIn">
          My Experience
        </h2>

        {/* Summary */}
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl mb-8 shadow-md border border-slate-200 
                        transition-all duration-700 hover:scale-[1.02]">
          <p className="text-lg font-semibold text-teal-600">
            ⭐ Average Rating: 4.2 / 5
          </p>
          <p className="text-slate-600">
            😊 Overall Patient Satisfaction: High
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-6">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 
                          transition-all duration-700 hover:shadow-xl hover:-translate-y-1">
            <h3 className="font-semibold text-xl text-slate-800 mb-2">
              General Checkup
            </h3>
            <p className="text-yellow-400 text-2xl">★★★★☆</p>
            <p className="text-slate-600 mt-3">
              Doctor was very friendly and explained everything clearly.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Dr. Sharma • 20 March 2026
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 
                          transition-all duration-700 hover:shadow-xl hover:-translate-y-1">
            <h3 className="font-semibold text-xl text-slate-800 mb-2">
              Dental Treatment
            </h3>
            <p className="text-yellow-400 text-2xl">★★★☆☆</p>
            <p className="text-slate-600 mt-3">
              Treatment was good but waiting time was a bit long.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Dr. Mehta • 10 March 2026
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 
                          transition-all duration-700 hover:shadow-xl hover:-translate-y-1">
            <h3 className="font-semibold text-xl text-slate-800 mb-2">
              Eye Checkup
            </h3>
            <p className="text-yellow-400 text-2xl">★★★★★</p>
            <p className="text-slate-600 mt-3">
              Excellent service and very quick process. Highly satisfied.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Dr. Reddy • 05 March 2026
            </p>
          </div>

        </div>

      </div>

      {/* Animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 1.2s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}
// Profile
export function Profile() {
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;

        if (!email) return;

        const res = await axios.get(
          `https://localhost:7077/api/Regester/PatientProfileByEmail/${email}`
        );

        setInfo(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  // ⏳ Loading
  if (!info) {
    return (
      <div className="flex justify-center mt-20">
        <motion.h2
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg font-semibold text-gray-600"
        >
          Loading profile...
        </motion.h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        max-w-md mx-auto mt-16 p-6 
        rounded-3xl 
        bg-white/70 backdrop-blur-xl
        shadow-2xl border border-gray-200
      "
    >
      {/* 🔥 Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {/* Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 scale-110"></div>

          {info.image ? (
            <img
              src={info.image}
              alt="patient"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {info.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {info.name}
        </h2>
        <p className="text-sm text-gray-500">Patient</p>
      </div>

      {/* 🔥 Info */}
      <div className="space-y-3 text-gray-700">
        {[
          { icon: <BiSolidUserCircle />, label: "Name", value: info.name },
          { icon: <MdPhone />, label: "Phone", value: info.phone },
          { icon: <MdEmail />, label: "Email", value: info.email },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="
              flex items-center gap-3 p-3 
              rounded-xl bg-white/80 
              border shadow-sm hover:shadow-md 
              transition
            "
          >
            <div className="text-blue-600 text-xl">{item.icon}</div>
            <span className="font-semibold w-20">{item.label}:</span>
            <span className="truncate">{item.value}</span>
          </motion.div>
        ))}
      </div>

      {/* 🔥 Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex justify-center"
      >
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2 px-6 py-3 
            rounded-full 
            bg-linear-to-r from-red-500 to-red-600 
            text-white font-semibold 
            shadow-lg hover:shadow-2xl 
            hover:scale-105 active:scale-95 
            transition-all duration-300
          "
        >
          <FiLogOut />
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
}

export function MedicalHistory() {
  // Example dynamic data (could come from props or API)
  const [history, setHistory] = useState([
    {
      name: "Blood Pressure",
      value: 120,
      unit: "mmHg",
      icon: <FaHeartbeat />,
      min: 80,
      max: 140,
    },
    {
      name: "Blood Sugar",
      value: 95,
      unit: "mg/dL",
      icon: <FaTint />,
      min: 70,
      max: 120,
    },
    {
      name: "Heart Rate",
      value: 72,
      unit: "bpm",
      icon: <FaHeartbeat />,
      min: 60,
      max: 100,
    },
  ]);

  return (
    <div className="max-w-md mx-auto bg-linear-to-b from-blue-50 to-white p-6 rounded-3xl shadow-2xl mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Medical History
      </h2>

      <div className="space-y-5">
        {history.map((item, idx) => {
          const percentage = Math.min(
            100,
            Math.max(
              0,
              ((item.value - item.min) / (item.max - item.min)) * 100,
            ),
          );
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition"
            >
              <div className="text-blue-600 text-3xl">{item.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-700">
                    {item.name}
                  </span>
                  <span className="text-gray-900 font-bold">
                    {item.value} {item.unit}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}