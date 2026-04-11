import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaUser,
  FaFileAlt,
  FaQuestionCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

export default function SidebarMenu({ isCollapsed, toggleCollapse }) {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const collapsed = isCollapsed !== undefined ? isCollapsed : localCollapsed;
  const toggle = toggleCollapse ?? (() => setLocalCollapsed((prev) => !prev));
  const location = useLocation();

  const navItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: FaHome, accent: "from-blue-700 to-blue-500" },
    { path: "/admin-dashboard/doctors", label: "Manage Doctors", icon: FaUserMd, accent: "from-blue-600 to-blue-400" },
    { path: "/admin-dashboard/users", label: "Manage Patients", icon: FaUser, accent: "from-blue-500 to-blue-300" },
    { path: "/admin-dashboard/appointments", label: "Appointments", icon: FaFileAlt, accent: "from-blue-800 to-blue-600" },
    { path: "/admin-dashboard/queries", label: "New Queries", icon: FaQuestionCircle, accent: "from-blue-400 to-blue-200" },
  ];

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 inset-y-0 z-40 flex flex-col rounded-4xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_-12px_rgba(30,58,138,0.1)] transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) md:rounded-none md:shadow-none md:border-r md:border-white overflow-hidden h-screen translate-x-0 ${collapsed ? "w-24" : "w-70"}`}
      >
        {/* Background Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-linear-to-br from-blue-100/60 via-blue-50/40 to-transparent blur-3xl -z-10 rounded-full pointer-events-none animate-pulse" />

        {/* Header */}
        <div className={`flex items-center gap-4 px-6 py-8 shrink-0 ${collapsed ? "justify-center px-0" : ""}`}>
          <button
            onClick={toggle}
            className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-sm ${
              collapsed
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "bg-rose-50 text-rose-600 hover:bg-rose-100"
            }`}
          >
            {collapsed ? <FaBars size={18} /> : <FaTimes size={18} />}
          </button>

          {!collapsed && (
            <div>
              <span className="text-2xl font-black text-blue-900 leading-none">
                CUREONIX
              </span>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mt-1">
                Health Portal
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className={`flex-1 ${collapsed ? "px-2" : "px-4"} py-4 space-y-2 overflow-y-auto`}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${collapsed ? "justify-center" : "gap-4 px-5"} py-4 rounded-2xl transition-all ${
                  isActive ? "bg-white shadow-md" : "hover:bg-blue-50"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                    isActive
                      ? `bg-gradient-to-br ${item.accent} text-white`
                      : "bg-blue-50 text-blue-400"
                  }`}
                >
                  <Icon />
                </div>

                {!collapsed && (
                  <span className="font-bold text-blue-700">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Back Button */}
        <div className={`${collapsed ? "p-2 mx-2" : "p-3 mx-4"} `}>
          <Link
            to="/"
            className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
          >
            {/* <MdArrowBack /> */}
            {!collapsed && <span className="px-5 py-3 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition">Back</span>}
          </Link>
        </div>
      </nav>
    </>
  );
}