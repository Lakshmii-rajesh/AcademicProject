import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import axios from "axios";
import {
  FaBars,
  FaUsers,
  FaUserMd,
  FaClipboardList,
  FaFileAlt,
  FaHome,
  FaUserCog,
} from "react-icons/fa";
import { VscTerminal } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import AddDoctor from "./AddDoctor"; // placeholder component for AddDoctor

export default function AdminDashBoard() {
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

      {/* Sidebar */}
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
          <SidebarItem to="doctors" icon={<FaUserMd />} label="Add Doctors" />
          <SidebarItem
            to="appointments"
            icon={<FaClipboardList />}
            label="Appointments"
          />
          <SidebarItem to="queries" icon={<FaFileAlt />} label="New Queries" />
        </nav>
      </div>

      {/* Main Content */}
      <div className={"p-6 transition-all duration-300 " + (isOpen ? "ml-64" : "")}>
        <Outlet />
      </div>
    </div>
  );
}

// Sidebar Item Component
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

// ================= Admin Dashboard Cards =================
export function ADashboard() {
  const cards = [
    { icon: <FaUserCog size={50} color="blue" />, headline: "Manage Users", link: "users" },
    { icon: <HiUserGroup size={50} color="blue" />, headline: "Manage Doctors", link: "doctors" },
    { icon: <VscTerminal size={50} color="blue" />, headline: "Appointments", link: "appointments" },
    { icon: <FaFileAlt size={50} color="blue" />, headline: "New Queries", link: "queries" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="rounded-lg bg-blue-200 p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition text-xl font-medium mt-4"
          >
            {card.icon}
            {card.headline}
          </Link>
        ))}
      </div>
    </>
  );
}

// ================= Manage Users =================
export function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const API = "https://localhost:7077/api/Regester/GetPatients";

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const filteredUsers = users
    .map((u, index) => ({
      Id: u.id ?? index,
      Name: u.name ?? "-",
      Email: u.email ?? "-",
      Phone: u.phone ?? "-",
    }))
    .filter((user) =>
      user.Name.toLowerCase().includes(search.toLowerCase()) ||
      user.Email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="p-2 border rounded w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.Id} className="text-center hover:bg-gray-100">
                  <td className="px-4 py-2 border">{user.Name}</td>
                  <td className="px-4 py-2 border">{user.Email}</td>
                  <td className="px-4 py-2 border">{user.Phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ================= Manage Doctors =================
export function ManageDoctors() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctors</h2>
      <AddDoctor />
    </div>
  );
}

// ================= Appointments =================
export function AppointmentHistory() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {/* Future Table or UI for appointments */}
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