import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { MdEmail, MdLocationCity, MdPhone } from "react-icons/md";
import { FaUser, FaHeartbeat, FaNotesMedical } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import { User, Stethoscope, Phone, Mail, MapPin } from "lucide-react";
import { FaSquarePersonConfined } from "react-icons/fa6";
import { BiSolidUserCircle } from "react-icons/bi";

const BASE_URL = "https://localhost:7077/api";
const DOCTOR_API = "https://localhost:7077/api/AddDoctors";

/* ===================== MAIN LAYOUT ===================== */
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
      <div className="bg-blue-300 flex justify-between items-center px-6 py-4">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)}>
            <FaBars size={25} />
          </button>
        )}

        <div ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <IoPerson size={30} />
            <p className="font-semibold">Patient</p>
            <RiArrowDropDownLine size={30} />
          </div>

          {open && (
            <div className="absolute right-6 mt-2 bg-white border rounded">
              <button
                className="px-4 py-2 hover:bg-blue-200"
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
        className={`fixed top-0 left-0 h-full w-64 bg-white transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center m-4 border-b pb-3">
          <h2 className="font-bold">CUREONIX</h2>
          <button onClick={() => setIsOpen(false)}>
            <ImCross />
          </button>
        </div>

        <nav>
          <SidebarItem to="." icon={<FaHome />} label="Dashboard" />
          <SidebarItem
            to="book"
            icon={<FaCalendarAlt />}
            label="Book Appointment"
          />
          <SidebarItem to="history" icon={<FaFileAlt />} label="History" />
          <SidebarItem to="profile" icon={<IoPerson />} label="Profile" />
        </nav>
      </div>

      {/* CONTENT */}
      <div className={`p-6 ${isOpen ? "ml-64" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}

/* ===================== SIDEBAR ITEM ===================== */
function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "."}
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 ${isActive ? "bg-blue-300 font-semibold" : "hover:bg-blue-200"
        }`
      }
    >
      {icon}
      {label}
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

      if (!email) {
        console.log("No email found in localStorage");
        return;
      }

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
    <>
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold my-6">Patient Dashboard</h1>

      {/* WELCOME CARD */}
      <div className="bg-blue-300 p-5 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">
          Welcome {patientInfo.name}
        </h2>
        <p>Here is your health summary</p>
      </div>

      {/* PATIENT DETAILS */}
      <div className="bg-white p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-6">Patient Details</h3>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="flex items-center gap-3">
            <FaUser className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{patientInfo.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdEmail className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{patientInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MdPhone className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{patientInfo.phone}</p>
            </div>
          </div>

        </div>
      </div>

      {/* HEALTH SECTION (UNCHANGED) */}
      <div className="bg-white p-6 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaHeartbeat className="text-red-500" />
          Health Tips & Reminders
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-3">
            <div>
              <p className="font-medium">💧 Stay Hydrated</p>
              <p className="text-sm text-gray-600">
                Drink at least 8 glasses of water daily.
              </p>
            </div>

            <div>
              <p className="font-medium">🩺 Regular Check-ups</p>
              <p className="text-sm text-gray-600">
                Visit doctor every 6–12 months.
              </p>
            </div>

            <div>
              <p className="font-medium">🥗 Healthy Diet</p>
              <p className="text-sm text-gray-600">
                Eat fruits, vegetables and balanced meals.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-medium">🏃 Exercise</p>
              <p className="text-sm text-gray-600">
                30 minutes daily walking or workout.
              </p>
            </div>

            <div>
              <p className="font-medium">🚑 Emergency</p>
              <p className="text-sm text-gray-600">
                Ambulance: 108 | Police: 100
              </p>
            </div>

            <div>
              <p className="font-medium">🧠 Mental Health</p>
              <p className="text-sm text-gray-600">
                Take breaks and reduce stress.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500">
          <p className="text-sm text-blue-700">
            <strong>Reminder:</strong> Healthy lifestyle = Better life 💙
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 my-5">
        <button
          onClick={() => navigate("book")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>

        <Link
          to="profile"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Profile
        </Link>
      </div>
    </>
  );
}

export function BookAppointment() {
  const BASE_URL = "https://localhost:7077/api";

  // ================= STATES =================
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

        // ✅ NORMALIZE DATA (FIXES YOUR ISSUE)
        const normalized = (res.data || []).map((d) => ({
          id: d.id || d.Id,
          doctorName: d.doctorName || d.DoctorName,
          specialization: d.specialization || d.Specialization,
        }));

        setDoctors(normalized);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  // ================= AUTO SELECT DOCTOR =================
  useEffect(() => {
    if (treatment) {
      const filtered = doctors.filter(
        (doc) =>
          doc.specialization?.trim().toLowerCase() ===
          treatment.trim().toLowerCase()
      );

      setDoctor(filtered.length > 0 ? filtered[0].doctorName : "");
    } else {
      setDoctor("");
    }
  }, [treatment, doctors]);

  // ================= BOOK APPOINTMENT =================
const handleBook = async () => {
  if (
    !patientName ||
    !contact ||
    !doctor ||
    !treatment ||
    !date ||
    !time ||
    !city
  ) {
    alert("Please fill all fields");
    return;
  }

  // ✅ GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("User:", user); // 🔍 DEBUG

  if (!user || !user.email) {
    alert("User not logged in properly");
    return;
  }

  // ✅ ADD EMAIL HERE
 const newAppointment = {
  patientName: patientName,      // ✅ from input
  contactNumber: contact,
  doctorName: doctor,
  reason: treatment,
  appointmentDate: date,
  timeSlot: time,
  city,
  email: JSON.parse(localStorage.getItem("user"))?.email || ""  // ✅ REQUIRED
};

  console.log("Sending Data:", newAppointment); // 🔍 DEBUG

  try {
    const response = await axios.post(
      `${BASE_URL}/BookAppointment/BookAppointment`,
      newAppointment
    );

    alert("Appointment booked successfully");

    setAppointments([...appointments, response.data]);

    // RESET FORM
    setPatientName("");
    setContact("");
    setTreatment("");
    setDoctor("");
    setCity("");
    setDate("");
    setTime("");
  } catch (error) {
    console.error(error);
    alert("Error saving appointment");
  }
};

  // ================= FILTER DOCTORS =================
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.specialization?.trim().toLowerCase() ===
      treatment?.trim().toLowerCase()
  );

  // ================= UI =================
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center px-10"
      style={{ backgroundImage: "url('/bookappointmentImage.png')" }}
    >
      <div className="w-full md:w-[520px] p-10 shadow-xl flex flex-col justify-center rounded-lg bg-white">
        <h2 className="text-3xl font-bold mb-6">Book Appointment</h2>

        <div className="flex flex-col gap-4">

          {/* Patient Name */}
          <input
            type="text"
            placeholder="Patient Name"
            className="border p-2 rounded"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          {/* Contact */}
          <input
            type="text"
            placeholder="Contact"
            className="border p-2 rounded"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {/* Treatment */}
          <select
            className="border p-2 rounded"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          >
            <option value="">Select Treatment</option>
            <option value="Dental">Dental</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Eye">Eye</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Neurology">Neurology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="ENT">ENT</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>

          {/* Doctor */}
          <select
            className="border p-2 rounded"
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

          {/* City */}
          <select
            className="border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mysore">Mysore</option>
            <option value="Mangalore">Mangalore</option>
            <option value="Hubli">Hubli</option>
            <option value="Dharwad">Dharwad</option>
            <option value="Belgaum">Belgaum</option>
            <option value="Davangere">Davangere</option>
            <option value="Shimoga">Shimoga</option>
            <option value="Tumkur">Tumkur</option>
            <option value="Udupi">Udupi</option>
            <option value="Other">Other</option>
          </select>

          {/* Date */}
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            onChange={(e) => {
              const selected = new Date(e.target.value + "T00:00:00");

              if (selected.getDay() === 0) {
                alert("Sunday appointments are not available");
                setDate("");
                return;
              }

              setDate(e.target.value);
            }}
          />

          {/* Time */}
          <select
            className="border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
          </select>

          {/* Button */}
          <button
            onClick={handleBook}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

// Appointment History Component
export function AppointmentHistoryPatient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-teal-50 p-6">

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

  // ⏳ Loading state
  if (!info) {
    return <h2 className="text-center mt-10">Loading profile...</h2>;
  }

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-blue-100 to-white rounded-3xl shadow-2xl p-6 mt-10 border border-gray-200">

      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        {info.image ? (
          <img
            src={info.image}
            alt="patient"
            className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mb-4">
            {info.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800">{info.name}</h2>
      </div>

      {/* Info */}
      <div className="grid gap-4 text-gray-700">
        <div className="flex items-center gap-3">
          <BiSolidUserCircle className="text-blue-600 w-6 h-6" />
          <span className="font-semibold w-24">Name:</span>
          <span>{info.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <MdPhone className="text-blue-600 w-6 h-6" />
          <span className="font-semibold w-24">Phone:</span>
          <span>{info.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <MdEmail className="text-blue-600 w-6 h-6" />
          <span className="font-semibold w-24">Email:</span>
          <span>{info.email}</span>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

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
    <div className="max-w-md mx-auto bg-gradient-to-b from-blue-50 to-white p-6 rounded-3xl shadow-2xl mt-10 border border-gray-200">
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