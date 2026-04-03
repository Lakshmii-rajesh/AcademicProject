import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaPills,
  FaUsers,
  FaThumbsUp,
  FaBrain,
  FaBone,
  FaArrowRight,
} from "react-icons/fa";

import Card from "../components/Card";
import Button from "../components/Button";

function HomePage2() {
  const logins = [
    { title: "Patient Login", img: "/Patient.png", link: "/patient-login" } ,
    { title: "Doctors Login", img: "/Doctorimg.png", link: "/doctor-login" },
    { title: "Admin Login", img: "/Admin.png", link: "/admin-login" },
  ];
  

  const services = [
    { title: "Advanced Cardiology", icon: <FaHeartbeat />, desc: "Expert heart care and diagnostics." },
    { title: "Orthopaedic Excellence", icon: <FaBone />, desc: "Comprehensive bone and joint solutions." },
    { title: "Neurological Insights", icon: <FaBrain />, desc: "Advanced neuro-medicine and care." },
    { title: "Precision Pharmacy", icon: <FaPills />, desc: "Verified medicinal supply and logistics." },
    { title: "Surgical Specialists", icon: <FaUsers />, desc: "State-of-the-art operative care." },
    { title: "Premium Diagnosis", icon: <FaThumbsUp />, desc: "High-accuracy diagnostic screening." },
  ];
  return (
    <div id="loginDiv" className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10 space-y-20">
      <div className="w-full flex flex-col items-center">
        <h1  className="text-2xl md:text-3xl font-semibold mb-8">Login & Registration </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {logins.map((login, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <img src={login.img} alt={login.title} className="w-full h-60 object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold mb-3">{login.title}</h2>

                <Link
                  to={login.link}
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Click Here 
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SPECIALIZED SERVICES SECTION */}
      <div className="bg-white rounded-2xl w-full border-y border-slate-200 py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none grayscale">
           <div className="bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] w-full h-full" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl text-left">
               <h2 id="serviceDiv" className="text-5xl font-black text-slate-900 tracking-tighter mb-6">Our Specialized <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">Departments.</span></h2>
               <p className="text-lg text-slate-500 font-medium leading-relaxed italic">Deployment of world-class medical experts across diverse clinical disciplines to ensure comprehensive well-being.</p>
            </div>
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="!p-10 hover:shadow-2xl hover:shadow-blue-500 rounded-2xl group transition-all duration-500 border-none bg-slate-100">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl text-blue-600 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed tracking-tight">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage2;