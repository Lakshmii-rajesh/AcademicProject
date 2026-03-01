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
          <SidebarItem to="patients" icon={<FaUserInjured />} label="Patients" />
          <SidebarItem to="appointments" icon={<FaClipboardList />} label="Appointments" />
          <SidebarItem to="search" icon={<FaSearch />} label="Patient Search" />
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
      link: "/users",
    },
    {
      icon: <HiUserGroup size={50} color="blue" />,
      headline: "Manage Doctors",
      link: "/doctors",
    },
    {
      icon: <FaUserInjured size={50} color="blue" />,
      headline: "Manage Patients",
      link: "/patients",
    },
    {
      icon: <VscTerminal size={50} color="blue" />,
      headline: "Appointments",
      link: "/appointments",
    },
    {
      icon: <FaFileAlt size={50} color="blue" />,
      headline: "New Queries",
      link: "/queries",
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
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
  const users = [
    {
      name: "Megha",
      email: "megha@gmail.com",
      mobile: "9483773017",
    },
  ];
  return (
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
  );
}

//  Doctors
export function ManageDoctors() {
  return (
    <div className="p-6">
      <AddDoctor />
    </div>
  );
}

// Patients
export function ManagePatients() {
  return <h2 className="text-2xl font-bold">Patients List</h2>;
}

//  Appointment History
export function AppointmentHistory() {
  const appointments = [
    {
      id: 1,
      patient: "Mansa",
      doctor: "Dr.Karna",
      date: "26/02/2026",
      time: "12:20pm",
      status: "Completed",
    },
  ];
  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">Appointment History</h1>

      <table className="w-full border">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Patient</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((e) => (
            <tr key={e.id} className="text-center">
              <td className="border p-2">{e.id}</td>
              <td className="border p-2">{e.patient}</td>
              <td className="border p-2">{e.doctor}</td>
              <td className="border p-2">{e.date}</td>
              <td className="border p-2">{e.time}</td>
              <td className="border p-2">{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Patient Search
export function PatientSearch() {
  const [isOpen] = useState(false);

  return (
    <div className={"p-6 transition-all duration-300 " + (isOpen ? "ml-64" : "ml-0")}>
      <h2 className="text-2xl font-bold mb-4">Patient Search</h2>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded w-full max-w-md"
      />
    </div>
  );
}

// Queries
export function NewQueries() {
  return <h2 className="text-2xl font-bold">New Queries</h2>;
}