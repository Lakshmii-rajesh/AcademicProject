import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { MdEmail, MdLocationCity, MdPhone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import { FaHeartbeat, FaTint } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaCalendarAlt,
  FaFileAlt,
  FaNotesMedical
} from "react-icons/fa";
const BASE_URL = "https://localhost:7077/api/BookAppointment";
// Main Patient Dashboard Component
export default function PatientDashboard() {
  const [isOpen, setIsOpen] = useState(false); // controls sidebar open/close
  const [open, setOpen] = useState(false); // controls profile dropdown

  const dropdownRef = useRef(null);

  // Close dropdown if click happens outside
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
      <div className="bg-blue-300 flex justify-between items-center px-6 py-4 relative text-black">
        {/* Hamburger button to open sidebar */}
        {!isOpen && (
          <button className="text-3xl text-black" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        )}

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer text-black"
            onClick={() => setOpen(!open)}
          >
            <IoPerson size={35} />
            <p className="text-lg font-semibold">Patient</p>
            <RiArrowDropDownLine size={35} />
          </div>

          {/* Dropdown content */}
          {open && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded">
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-300"
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
        className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center m-4 px-4 py-4 border-b">
          <p className="text-xl font-bold">CUREONIX</p>
          <button onClick={() => setIsOpen(false)}>
            <ImCross />
          </button>
        </div>

        {/* Sidebar navigation links */}
        <nav className="space-y-1 mt-2">
          <SidebarItem to="." icon={<FaHome />} label="Dashboard" />
          <SidebarItem to="book" icon={<FaCalendarAlt />} label="Book Appointment" />
          <SidebarItem to="history" icon={<FaFileAlt />} label="Appointment History" />
          <SidebarItem to="medical" icon={<FaNotesMedical />} label="Medical History" />
          <SidebarItem to="profile" icon={<IoPerson />} label="My Profile" />
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className={`p-6 transition-all duration-300 ${isOpen ? "ml-64" : ""}`}>
        <Outlet /> {/* Nested routes will render here */}
      </div>

    </div>
  );
}

// Sidebar item component
function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "."} // set active only for current path
      className={({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 hover:bg-blue-200 ${isActive ? "bg-blue-300 font-semibold" : ""
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

// Dashboard content
export function PDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-4xl font-bold my-6">Patient Dashboard</h1>

      {/* Quick welcome card */}
      <div className="bg-blue-300 p-5 rounded-lg mb-6 text-black">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p>Here is your health summary</p>
      </div>

      {/* Stats cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Assigned Doctor" value="Dr. Smith" />
        <StatCard title="Next Appointment" value="12 Oct 2026" />
        <StatCard title="Prescriptions" value="3 Active" />
        <StatCard title="Lab Reports" value="2 New" />
      </div>

      {/* Vitals */}
      <div className="bg-white p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-3">Vitals</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <p>BP: 120/80</p>
          <p>Sugar: 95 mg/dL</p>
          <p>Weight: 68 kg</p>
          <p>Height: 170 cm</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("book")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          View Reports
        </button>
      </div>
    </>
  );
}

// Small card for showing stats
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}


// BOOK APPOINTMENT COMPONENT
export function BookAppointment() {

  // Form states
  const [appointments, setAppointments] = useState([]);

  const [patientName, setPatientName] = useState("");
  const [contact, setContact] = useState("");
  const [doctor, setDoctor] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");

  // Handle booking logic
const handleBook = async () => {
  if (!patientName || !contact || !doctor || !treatment || !date || !time || !city) {
    alert("Please fill all fields");
    return;
  }

  const newAppointment = {
    patientName,
    contactNumber: contact, // Matches backend model
    doctorName: doctor,
    reason: treatment,
    appointmentDate: date,
    timeSlot: time,
    city
  };

  try {
    // FIX: Send 'newAppointment' and use the correct sub-route
    const response = await axios.post(`${BASE_URL}/BookAppointment`, newAppointment);

    alert("Appointment booked successfully");
    setAppointments([...appointments, response.data]);
    // ... rest of your reset logic
  } catch (error) {
    console.error(error);
    alert("Error saving appointment");
  }
};
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center px-10"
      style={{ backgroundImage: "url('/bookappointmentImage.png')" }}
    >

      <div className="w-full md:w-[520px] p-10 shadow-xl flex flex-col justify-center rounded-lg">

        <h2 className="text-3xl font-bold mb-6">
          Book Appointment
        </h2>

        <div className="flex flex-col gap-4">

          {/* Input fields */}
          <input
            type="text"
            placeholder="Patient Name"
            className="border p-2 rounded"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Contact"
            className="border p-2 rounded"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          {/* Select treatment */}
          {/* Select treatment */}
          <select
            className="border p-2 rounded"
            value={treatment}
            onChange={(e) => {
              setTreatment(e.target.value);
              setDoctor(""); // reset doctor if treatment changes
            }}
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

          {/* Select doctor */}
          <select
            className="border p-2 rounded"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>

            {treatment === "Dental" && (
              <>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. John">Dr. John</option>
                <option value="Dr. Priya">Dr. Priya</option>
                <option value="Dr. Rahul">Dr. Rahul</option>
                <option value="Dr. Sneha">Dr. Sneha</option>
                <option value="Dr. Kiran">Dr. Kiran</option>
              </>
            )}

            {treatment === "Cardiology" && (
              <>
                <option value="Dr. Meera">Dr. Meera</option>
                <option value="Dr. Arjun">Dr. Arjun</option>
                <option value="Dr. Vikram">Dr. Vikram</option>
                <option value="Dr. Neha">Dr. Neha</option>
                <option value="Dr. Rohan">Dr. Rohan</option>
                <option value="Dr. Tanya">Dr. Tanya</option>
              </>
            )}

            {treatment === "Eye" && (
              <>
                <option value="Dr. Aditi">Dr. Aditi</option>
                <option value="Dr. Sameer">Dr. Sameer</option>
                <option value="Dr. Kavya">Dr. Kavya</option>
                <option value="Dr. Rajesh">Dr. Rajesh</option>
                <option value="Dr. Anil">Dr. Anil</option>
                <option value="Dr. Priya">Dr. Priya</option>
              </>
            )}

            {treatment === "Orthopedic" && (
              <>
                <option value="Dr. Ravi">Dr. Ravi</option>
                <option value="Dr. Nisha">Dr. Nisha</option>
                <option value="Dr. Sameer">Dr. Sameer</option>
                <option value="Dr. Kiran">Dr. Kiran</option>
                <option value="Dr. Tanya">Dr. Tanya</option>
                <option value="Dr. Arjun">Dr. Arjun</option>
              </>
            )}

            {treatment === "Neurology" && (
              <>
                <option value="Dr. Ananya">Dr. Ananya</option>
                <option value="Dr. Raj">Dr. Raj</option>
                <option value="Dr. Simran">Dr. Simran</option>
                <option value="Dr. Varun">Dr. Varun</option>
                <option value="Dr. Meera">Dr. Meera</option>
                <option value="Dr. Rohan">Dr. Rohan</option>
              </>
            )}

            {treatment === "Dermatology" && (
              <>
                <option value="Dr. Sneha">Dr. Sneha</option>
                <option value="Dr. Priya">Dr. Priya</option>
                <option value="Dr. Kavya">Dr. Kavya</option>
                <option value="Dr. Arjun">Dr. Arjun</option>
                <option value="Dr. Neha">Dr. Neha</option>
                <option value="Dr. Sameer">Dr. Sameer</option>
              </>
            )}

            {treatment === "ENT" && (
              <>
                <option value="Dr. Rajesh">Dr. Rajesh</option>
                <option value="Dr. Meera">Dr. Meera</option>
                <option value="Dr. Anil">Dr. Anil</option>
                <option value="Dr. Nisha">Dr. Nisha</option>
                <option value="Dr. Varun">Dr. Varun</option>
                <option value="Dr. Tanya">Dr. Tanya</option>
              </>
            )}

            {treatment === "Gynecology" && (
              <>
                <option value="Dr. Kavya">Dr. Kavya</option>
                <option value="Dr. Ananya">Dr. Ananya</option>
                <option value="Dr. Priya">Dr. Priya</option>
                <option value="Dr. Sneha">Dr. Sneha</option>
                <option value="Dr. Meera">Dr. Meera</option>
                <option value="Dr. Nisha">Dr. Nisha</option>
              </>
            )}

            {treatment === "Pediatrics" && (
              <>
                <option value="Dr. Rohan">Dr. Rohan</option>
                <option value="Dr. Tanya">Dr. Tanya</option>
                <option value="Dr. Anil">Dr. Anil</option>
                <option value="Dr. Priya">Dr. Priya</option>
                <option value="Dr. Sneha">Dr. Sneha</option>
                <option value="Dr. Kavya">Dr. Kavya</option>
              </>
            )}

            {treatment === "General Medicine" && (
              <>
                <option value="Dr. Raj">Dr. Raj</option>
                <option value="Dr. Arjun">Dr. Arjun</option>
                <option value="Dr. Meera">Dr. Meera</option>
                <option value="Dr. Simran">Dr. Simran</option>
                <option value="Dr. Ravi">Dr. Ravi</option>
                <option value="Dr. Nisha">Dr. Nisha</option>
              </>
            )}
          </select>

          {/* City selection */}
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
            <option value="Bidar">Bidar</option>
            <option value="Bellary">Bellary</option>
            <option value="Raichur">Raichur</option>
            <option value="Gulbarga">Gulbarga</option>
            <option value="Chitradurga">Chitradurga</option>
            <option value="Hassan">Hassan</option>
            <option value="Mandya">Mandya</option>
            <option value="Chikmagalur">Chikmagalur</option>
            <option value="Kolar">Kolar</option>
            <option value="Karwar">Karwar</option>
            <option value="Bagalkot">Bagalkot</option>
            <option value="Bijapur">Bijapur</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // can't pick today
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
          {/* Time selection */}
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

          {/* Confirm button */}
          <button
            onClick={handleBook}
            className="bg-blue-600 text-white py-2 rounded-lg"
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

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (id) => {
  try {
   
    await axios.delete(`${BASE_URL}/DeleteAppointment?id=${id}`);
    fetchAppointments(); 
  } catch (err) {
    console.error(err);      
  }
};
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">Appointment History</h2>

      {appointments.length === 0 ? (
        <p>No appointments booked.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2">Patient</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Treatment</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{a.patientName}</td>
                  <td className="border p-2">{a.contact}</td>
                  <td className="border p-2">{a.treatment}</td>
                  <td className="border p-2">{a.doctor}</td>
                  <td className="border p-2">{a.city}</td>
                  <td className="border p-2">{a.date}</td>
                  <td className="border p-2">{a.time}</td>
                  <td className="border p-2">{a.status}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => cancelAppointment(i)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// Profile
export function Profile({ patient }) {
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState(patient);

  useEffect(() => {
    localStorage.setItem("patientInfo", JSON.stringify(info));
  }, [info]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-blue-100 to-white rounded-3xl shadow-2xl p-6 mt-10 border border-gray-200">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mb-4">
          {info.name.charAt(0).toUpperCase()}
        </div>
        {editing ? (
          <input
            type="text"
            name="name"
            value={info.name}
            onChange={handleChange}
            className="text-2xl font-bold text-gray-800 border-b border-gray-400 text-center focus:outline-none w-full max-w-xs"
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800">{info.name}</h2>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 text-gray-700">
        <div className="flex items-center gap-3">
          <MdEmail className="text-blue-600 w-6 h-6" />
          <span className="font-semibold w-24">Email:</span>
          {editing ? (
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              className="border-b border-gray-400 focus:outline-none flex-1"
            />
          ) : (
            <span>{info.email}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <MdPhone className="text-blue-600 w-6 h-6" />
          <span className="font-semibold w-24">Phone:</span>
          {editing ? (
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              className="border-b border-gray-400 focus:outline-none flex-1"
            />
          ) : (
            <span>{info.phone}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <MdLocationCity className="text-blue-600 w-6 h-6" />
          <span className="font-semibold w-24">City:</span>
          {editing ? (
            <input
              type="text"
              name="city"
              value={info.city}
              onChange={handleChange}
              className="border-b border-gray-400 focus:outline-none flex-1"
            />
          ) : (
            <span>{info.city}</span>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleEditToggle}
          className={`px-6 py-2 rounded-full text-white font-semibold transition ${editing ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {editing ? "Save Profile" : "Edit Profile"}
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
  }).isRequired,
};

export function MedicalHistory() {
  // Example dynamic data (could come from props or API)
  const [history, setHistory] = useState([
    { name: "Blood Pressure", value: 120, unit: "mmHg", icon: <FaHeartbeat />, min: 80, max: 140 },
    { name: "Blood Sugar", value: 95, unit: "mg/dL", icon: <FaTint />, min: 70, max: 120 },
    { name: "Heart Rate", value: 72, unit: "bpm", icon: <FaHeartbeat />, min: 60, max: 100 },
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
            Math.max(0, ((item.value - item.min) / (item.max - item.min)) * 100)
          );
          return (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition">
              <div className="text-blue-600 text-3xl">{item.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-700">{item.name}</span>
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
