import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaPills,
  FaUsers,
  FaThumbsUp,
  FaBrain,
  FaBone,
}from "react-icons/fa"; 
function HomePage2() {
  const logins = [
    { title: "Patient Login", img: "/Patient.png", link: "/patient-login" } ,
    { title: "Doctors Login", img: "/Doctorimg.png", link: "/doctor-login" },
    { title: "Admin Login", img: "/Admin.png", link: "/admin-login" },
  ];
  const services = [
    { title: "Cardiology", icon: <FaHeartbeat size={40}             className="text-blue-400" /> },
    { title: "Orthopaedic", icon: <FaBone size={40}                 className="text-blue-400" /> },
    { title: "Neurologist", icon: <FaBrain size={40}                className="text-blue-400" /> },
    { title: "Pharma Pipeline", icon: <FaPills size={40}            className="text-blue-400" /> },
    { title: "Pharma Team", icon: <FaUsers size={40}                className="text-blue-400" /> },
    { title: "High Quality treatments", icon: <FaThumbsUp size={40} className="text-blue-400" /> },
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
      <div className="w-full flex flex-col items-center">
        <h1 id="serviceDiv" className="text-2xl md:text-3xl font-semibold mb-8">Our Services</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-4xl text-center">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              {service.icon}
              <p className="mt-3 text-lg font-medium">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HomePage2;