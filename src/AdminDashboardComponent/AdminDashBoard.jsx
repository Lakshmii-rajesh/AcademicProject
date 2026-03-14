import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaUsers,
  FaUserMd,
  FaUserInjured,
  FaClipboardList,
  FaSearch,
  FaFileAlt,
  FaHome,
  FaUserCog,
  FaChevronDown,
} from "react-icons/fa";
import { VscTerminal } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { Outlet } from "react-router-dom";
// import Doctors from "./AddDoctor";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import AddDoctor from "./AddDoctor";

export default function AdminDashboard() {
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
      {/* Navbar */}
      <div className="bg-blue-200 flex justify-between items-center px-6 py-4 shadow">
        {!isOpen && (
          <button className="text-3xl" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <IoPerson size={35} color="blue" />
            <p className="font-semibold">Admin</p>
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

      {/*  Sidebar */}
      <div
        className={
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h1 className="text-xl font-bold">ADMIN PANEL</h1>
          <button onClick={() => setIsOpen(false)}>
            <ImCross />
          </button>
        </div>

        <nav className="space-y-1 mt-2">
          <SidebarItem to="." icon={<FaHome />} label="Dashboard" />
          <SidebarItem to="users" icon={<FaUsers />} label="Manage Users" />
          <SidebarItem to="doctors" icon={<FaUserMd />} label=" AddDoctors" />
          <SidebarItem to="appointments" icon={<FaClipboardList />} label="Appointments" />
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={"p-6 transition-all duration-300 " + (isOpen ? "ml-64" : "")}
      >
        <Outlet />
      </div>
    </div>
  );
}


//  Sidebar Item 
function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        "flex items-center gap-3 px-4 py-2 rounded hover:text-blue-600 " +
        (isActive ? "text-blue-600 font-semibold" : "text-gray-700")
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

//  Dashboard
export function ADashboard() {
  let array = [
    {
      icon: <FaUserCog size={50} color="blue" />,
      headline: "Manage Users",
      link: "/admin-dashboard/users",
    },
    {
      icon: <HiUserGroup size={50} color="blue" />,
      headline: "Manage Doctors",
      link: "/admin-dashboard/doctors",
    },
    {
      icon: <VscTerminal size={50} color="blue" />,
      headline: "Appointments",
      link: "/admin-dashboard/appointments",
    },
    {
      icon: <FaFileAlt size={50} color="blue" />,
      headline: "New Queries",
      link: "/admin-dashboard/queries",
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {array.map((e, index) => (
          <Link
            key={index}
            to={e.link}
            className="rounded-lg bg-blue-200 p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition text-xl font-medium mt-4"
          >
            {e.icon}
            {e.headline}
          </Link>
        ))}
      </div>

      
    </>
  );
}

//  Users
export function ManageUsers() {
  const [isOpen] = useState(false);
  const users = [
    {
      name: "Megha",
      email: "megha@gmail.com",
      mobile: "9483773017",
    },
  ];
  return (
    <>
    <div className={"p-6 transition-all duration-300 " + (isOpen ? "ml-64" : "ml-0")}>
      <h2 className="text-2xl font-bold mb-4">Patient Search</h2>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded w-full max-w-md"
      />
    </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mobile Number</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
  
}

//  Doctors
export function ManageDoctors() {
  return (
    <div className="p-6">
      <AddDoctor/>
    </div>
  );
}


//  Appointment History

export function AppointmentHistory() {

  const appointments = [
    {
      id: 1,
      patient: "Rahul Kumar",
      doctor: "Dr. Meena",
      department: "Cardiology",
      date: "25 Feb 2026",
      time: "10:30 AM",
      status: "Completed"
    },
    {
      id: 2,
      patient: "Anjali Sharma",
      doctor: "Dr. Ramesh",
      department: "Dermatology",
      date: "26 Feb 2026",
      time: "12:00 PM",
      status: "Cancelled"
    },
    {
      id: 3,
      patient: "Kiran Gowda",
      doctor: "Dr. Priya",
      department: "Orthopedic",
      date: "27 Feb 2026",
      time: "03:15 PM",
      status: "Pending"
    }
  ];

  const statusColor = (status) => {
    if (status === "Completed")
      return "bg-green-100 text-green-700";
    if (status === "Cancelled")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Appointment History
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                {item.patient}
              </h2>

              <span
                className={`px-3 py-1 text-sm rounded-full ${statusColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-gray-600">
              Doctor : <span className="font-medium">{item.doctor}</span>
            </p>

            <p className="text-gray-600">
              Department :{" "}
              <span className="font-medium">
                {item.department}
              </span>
            </p>

            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>Date : {item.date}</span>
              <span>Time : {item.time}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}




// Queries
export function NewQueries() {
  return <h2 className="text-2xl font-bold">New Queries</h2>;
}