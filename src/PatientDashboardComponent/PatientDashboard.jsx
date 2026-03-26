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
    name: "N",
    email: "N/A",
    phone: "N/A",
    city: "N/A",
  });

  useEffect(() => {
    const fetchPatient = async () => {
const patientId = localStorage.getItem("userId");

      if (!patientId) return; // No ID saved

      try {
        const res = await axios.get(
          `https://localhost:7077/api/Regester/PatientById/${patientId}`
        );

        const data = res.data;

        // Map backend fields correctly
       setPatientInfo({
  name: data.name || "N/A",
  email: data.email || "N/A",
  phone: data.phone || "N/A",
});
      } catch (err) {
        console.error("Error fetching patient info:", err);
      }
    };

    fetchPatient();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold my-6">Patient Dashboard</h1>

      {/* Welcome */}
      <div className="bg-blue-300 p-5 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p>Here is your health summary</p>
      </div>

      {/* Patient Details */}
      <div className="bg-white p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Patient Details
        </h3>

        <div className="grid md:grid-cols-4 gap-5">
          

          {/* Name */}
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm">Patient Name</p>
              <p className="font-semibold text-lg">{patientInfo.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <MdEmail className="text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-semibold text-lg">{patientInfo.email}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3">
            <MdPhone className="text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm">Contact</p>
              <p className="font-semibold text-lg">{patientInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Static Information Section */}
      <div className="bg-white p-6 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaHeartbeat className="text-red-500" />
          Health Tips & Reminders
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">Stay Hydrated</p>
                <p className="text-sm text-gray-600">Drink at least 8 glasses of water daily to maintain good health.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">Regular Check-ups</p>
                <p className="text-sm text-gray-600">Schedule annual health check-ups to detect issues early.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">Healthy Diet</p>
                <p className="text-sm text-gray-600">Include fruits, vegetables, and whole grains in your daily meals.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">Exercise Regularly</p>
                <p className="text-sm text-gray-600">Aim for at least 30 minutes of moderate exercise daily.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">Emergency Contact</p>
                <p className="text-sm text-gray-600">Keep emergency numbers handy: Ambulance - 108, Police - 100</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-800">Mental Health</p>
                <p className="text-sm text-gray-600">Take time for relaxation and maintain work-life balance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-blue-800">
            <strong>Remember:</strong> Your health is your wealth. Regular monitoring and healthy lifestyle choices lead to a better quality of life.
          </p>
        </div>
      </div>

      {/* Buttons */}
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

  // Form states
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [contact, setContact] = useState("");
  const [treatment, setTreatment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/AddDoctors`);
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Auto-select first doctor when treatment changes
  useEffect(() => {
    if (treatment) {
      const filtered = doctors.filter(
        (doc) =>
          doc.Specialization?.trim().toLowerCase() === treatment.trim().toLowerCase()
      );
      setDoctor(filtered.length > 0 ? filtered[0].DoctorName : "");
    } else {
      setDoctor("");
    }
  }, [treatment, doctors]);

  // Handle booking logic
  const handleBook = async () => {
    if (!patientName || !contact || !doctor || !treatment || !date || !time || !city) {
      alert("Please fill all fields");
      return;
    }

    const newAppointment = {
      patientName,
      contactNumber: contact,
      doctorName: doctor,
      reason: treatment,
      appointmentDate: date,
      timeSlot: time,
      city,
    };

    try {
      const response = await axios.post(`${BASE_URL}/BookAppointment/BookAppointment`, newAppointment);
      alert("Appointment booked successfully");
      setAppointments([...appointments, response.data]);

      // Reset form
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

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center px-10"
      style={{ backgroundImage: "url('/bookappointmentImage.png')" }}
    >
      <div className="w-full md:w-[520px] p-10 shadow-xl flex flex-col justify-center rounded-lg bg-white">
        <h2 className="text-3xl font-bold mb-6">Book Appointment</h2>

        <div className="flex flex-col gap-4">
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

          {/* Select doctor */}
          <select
            className="border p-2 rounded"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter(
                (doc) =>
                  doc.Specialization?.trim().toLowerCase() === treatment.trim().toLowerCase()
              )
              .map((doc) => (
                <option key={doc.Id} value={doc.DoctorName}>
                  {doc.DoctorName} ({doc.Specialization})
                </option>
              ))}
          </select>

          {/* Select city */}
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
        {info.image ? (
          <img
            src={info.image}
            alt="patient"
            className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mb-4">
            {info.name.charAt(0).toUpperCase()}
          </div>
        )}

        {editing ? (
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
              className="text-2xl font-bold text-gray-800 border-b border-gray-400 text-center focus:outline-none w-full"
            />
            <label className="cursor-pointer bg-gray-200 px-3 py-1 rounded text-sm">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setInfo((prev) => ({ ...prev, image: url }));
                  }
                }}
              />
            </label>
          </div>
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
          className={`px-6 py-2 rounded-full text-white font-semibold transition ${editing
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-600 hover:bg-blue-700"
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