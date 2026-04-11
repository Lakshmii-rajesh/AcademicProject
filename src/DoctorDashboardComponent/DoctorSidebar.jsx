import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaFileAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";

export default function DoctorSidebar({ isCollapsed, toggleCollapse }) {
    const [localCollapsed, setLocalCollapsed] = useState(false);
    const collapsed = isCollapsed !== undefined ? isCollapsed : localCollapsed;
    const toggle = toggleCollapse ?? (() => setLocalCollapsed((prev) => !prev));
    const location = useLocation();

    const navItems = [
        { path: "/doctor-dashboard", label: "Dashboard", icon: FaHome },
        { path: "/doctor-dashboard/appointments", label: "Appointments", icon: FaFileAlt },
    ];

    return (
        <nav
            className={`h-screen flex flex-col rounded-4xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_-12px_rgba(30,58,138,0.1)] transition-all duration-500 md:rounded-none md:shadow-none md:border-r md:border-white overflow-hidden ${collapsed ? "w-24" : "w-70"
                }`}
        >
            {/* Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-linear-to-br from-blue-100/60 via-blue-50/40 to-transparent blur-3xl -z-10 rounded-full pointer-events-none animate-pulse" />

            {/* Header */}
            <div className={`flex items-center gap-4 px-6 py-8 ${collapsed ? "justify-center px-0" : ""}`}>
                <button
                    onClick={toggle}
                    className={`p-2.5 rounded-xl ${collapsed
                        ? "bg-blue-50 text-blue-600"
                        : "bg-rose-50 text-rose-600"
                        }`}
                >
                    {collapsed ? <FaBars size={18} /> : <FaTimes size={18} />}
                </button>

                {!collapsed && (
                    <div>
                        <span className="text-2xl font-black text-blue-900">
                            CUREONIX
                        </span>
                        <span className="block text-[10px] font-bold text-blue-500">
                            Health Portal
                        </span>
                    </div>
                )}
            </div>

            {/* Nav */}
            <div className={`flex-1 ${collapsed ? "px-2" : "px-4"} py-4 space-y-2`}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center ${collapsed ? "justify-center" : "gap-4 px-5"
                                } py-4 rounded-2xl ${isActive ? "bg-white shadow text-blue-900" : "hover:bg-blue-50"
                                }`}
                        >
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-xl ${isActive ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-400"
                                    }`}
                            >
                                <Icon />
                            </div>

                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>

            {/* Back */}
            <div className="p-3 mx-4 mb-4 rounded-xl bg-slate-100">
                <Link to="/" className="flex items-center gap-3">
                    <MdArrowBack />
                    {!collapsed && <span className="text-xs font-bold">Back to Home</span>}
                </Link>
            </div>
        </nav>
    );
}