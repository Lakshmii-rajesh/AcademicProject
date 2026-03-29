import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaFileAlt } from "react-icons/fa";
import { FaUserDoctor, FaClipboardList } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
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

        if (!email) {
          console.log("No email found");
          return;
        }

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
    <>
      <h1 className="text-4xl font-bold my-6">Doctor Dashboard</h1>

      {/* ✅ Welcome Card */}
      <div className="bg-blue-300 p-5 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">
          Welcome Dr. {doctor.name}
        </h2>
        <p>{doctor.specialization}</p>
      </div>

      {/* Quick cards */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Profile */}
        <div
          onClick={() => navigate("profile")}
          className="bg-blue-200 p-6 rounded-lg shadow text-center cursor-pointer hover:shadow-lg transition"
        >
          <FaUserDoctor className="text-4xl mx-auto mb-2 text-blue-700" />
          <h2 className="text-lg font-semibold">My Profile</h2>
        </div>

        {/* Appointments */}
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
    <div className="bg-blue-50 p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
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

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const email =
        user?.email || localStorage.getItem("userEmail");

      const url = `https://localhost:7077/api/BookAppointment/GetByDoctorSpecialization/${encodeURIComponent(email)}`;

      const res = await axios.get(url);

      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data?.$values) {
        data = res.data.$values;
      } else if (res.data?.data) {
        data = res.data.data;
      }

      setAppointments(data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setAppointments([]);
    }
  };

  // STATUS UPDATE (UPDATED ONLY)
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

  // ACCEPT → only WhatsApp (unchanged)
  if (status === "Accepted" && appointment) {
    let message = `Hello,

Your appointment is CONFIRMED ✅

Patient: ${appointment.patientName}
Reason: ${appointment.reason}
Date: ${appointment.appointmentDate?.split("T")[0]}
Time: ${appointment.timeSlot}

Thank you.`;

    window.open(
      `https://wa.me/91${appointment.contactNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  // ❌ REJECT → DELETE API + WhatsApp
  if (status === "Rejected" && appointment) {
    axios
      .delete(
        `https://localhost:7077/api/BookAppointment/DeleteAppointment?id=${id}`
      )
      .then(() => {
        setAppointments((prev) =>
          prev.filter((a) => a.id !== id)
        );

        let message = `Hello,

Your appointment has been CANCELLED ❌

Patient: ${appointment.patientName}
Reason: ${appointment.reason}
Date: ${appointment.appointmentDate?.split("T")[0]}
Time: ${appointment.timeSlot}

Sorry for the inconvenience. Please reschedule.`;

        window.open(
          `https://wa.me/91${appointment.contactNumber}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      })
      .catch((err) => {
        console.error("DELETE ERROR:", err);
        alert("Failed to reject appointment");
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Appointments
        </h1>

        <input
          type="text"
          placeholder="Search patient..."
          className="w-full md:w-80 px-4 py-2 border rounded-lg mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left">

            <thead className="bg-gray-100 text-sm">
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
                  <tr key={a.id || index} className="border-t hover:bg-gray-50">

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
                        className={`px-3 py-1 rounded-full text-xs font-semibold
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
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(a.id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Reject
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
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