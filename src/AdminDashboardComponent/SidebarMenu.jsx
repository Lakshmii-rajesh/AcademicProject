import React, { useState } from "react";
import {
  FaBars,
  FaUserMd,
  FaUsers,
  FaUser,
  FaFileAlt,
  FaSearch,
  FaHome,
  FaChevronDown,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDashboardClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 " +
          "transform transition-transform duration-300 " +
          (isOpen ? "translate-x-0 " : "-translate-x-full ") +
          "md:translate-x-0"
        }
      >
        <div className="flex justify-between items-center border-b">
          <div className="p-6 mx-9 text-xl font-bold">CUREONIX</div>

          <div className="flex justify-end border-b md:hidden">
            <button
              className="p-3 px-0 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <ImCross />
            </button>
          </div>
        </div>

        <nav className="mt-4">
          {/* Dashboard */}
          <div
            className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer"
            onClick={handleDashboardClick}
          >
            <FaHome className="text-blue-500 mr-3" />
            Dashboard
          </div>

          {/* Doctors */}
          <div
            className="flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer"
            onClick={() => setDoctorOpen(!doctorOpen)}
          >
            <div className="flex items-center">
              <FaUserMd className="text-blue-500 mr-3" />
              Doctors
            </div>
            <FaChevronDown
              className={
                "transition-transform " + (doctorOpen ? "rotate-180" : "")
              }
            />
          </div>

          {doctorOpen && (
            <div className="ml-10 text-sm text-gray-700">
              <ul>
                <li className="py-2 hover:text-blue-600">
                  <Link to="/add-doctor">Add Doctor</Link>
                </li>
                <li className="py-2 hover:text-blue-600">
                  <Link to="/manage-doctors">Manage Doctors</Link>
                </li>
              </ul>
            </div>
          )}

          <div className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <FaUsers className="text-blue-500 mr-3" /> Users
          </div>

          <div className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <FaUser className="text-blue-500 mr-3" /> Patients
          </div>

          <div className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <FaFileAlt className="text-blue-500 mr-3" /> Appointment History
          </div>

          <div className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer">
            <FaSearch className="text-blue-500 mr-3" /> Patient Search
          </div>
        </nav>
      </div>

      <button
        className="fixed top-4 left-4 z-50 p-2 text-2xl bg-white shadow rounded md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {/* Page content spacing */}
      <div className="flex-1 ml-0 md:ml-64">
        {/* Your page content goes here */}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}