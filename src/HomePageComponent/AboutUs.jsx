import React from "react";
import {
  FaUserMd,
  FaHospital,
  FaCalendarCheck,
  FaFileInvoice,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
 
export default function AboutUs(){
  const cards = [
    {
      icon: <FaHospital />,
      title: "Patient Management",
      text: "Secure digital records",
      bg: "from-blue-200 to-blue-50",
      iconbg: "bg-blue-600",
    },
    {
      icon: <FaUserMd />,
      title: "Doctor Management",
      text: "Professional doctor control",
      bg: "from-cyan-200 to-cyan-50",
      iconbg: "bg-cyan-600",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Appointments",
      text: "Easy smart booking",
      bg: "from-sky-200 to-sky-50",
      iconbg: "bg-sky-600",
    },
    {
      icon: <FaFileInvoice />,
      title: "Billing & Reports",
      text: "Fast billing analytics",
      bg: "from-indigo-200 to-indigo-50",
      iconbg: "bg-indigo-600",
    },
  ];
 
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-cyan-50 py-10 px-4 min-h-screen">
 
      <div className="max-w-6xl mx-auto space-y-8">
 
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"
        >
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl"
          />
 
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"
          />
 
          <h1 className="text-4xl font-bold mb-4 relative z-10">
            Excellence in Modern Healthcare
          </h1>
 
          <p className="text-blue-100 text-lg max-w-2xl leading-8 relative z-10">
            Premium digital hospital management designed for trust,
            innovation, and superior patient care.
          </p>
        </motion.div>
 
        {/* COUNTERS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              number: 5000,
              suffix: "+",
              title: "Patients Served",
              color: "from-blue-500 to-blue-300",
            },
            {
              number: 120,
              suffix: "+",
              title: "Expert Doctors",
              color: "from-cyan-500 to-cyan-300",
            },
            {
              number: 24,
              suffix: "/7",
              title: "Emergency Care",
              color: "from-indigo-500 to-indigo-300",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.04 }}
              className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 text-white shadow-xl text-center`}
            >
              <h2 className="text-4xl font-bold mb-2">
                <CountUp end={item.number} duration={3} suffix={item.suffix} />
              </h2>
 
              <p className="text-lg font-medium">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
 
        {/* IMAGE + INTRO */}
        <div className="grid md:grid-cols-2 gap-8">
 
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-lg p-4 border border-blue-100"
          >
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
              alt="hospital"
              className="rounded-2xl w-full h-[350px] object-cover"
            />
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-100 via-white to-cyan-100 rounded-3xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Compassionate Care Powered by Precision
            </h2>
 
            <p className="text-slate-600 leading-8">
              Our integrated healthcare platform simplifies appointments,
              records, doctor schedules, and billing while delivering a premium
              digital hospital experience.
            </p>
          </motion.div>
 
        </div>
 
        {/* MISSION + VISION */}
        <div className="grid md:grid-cols-2 gap-8">
 
          {["Mission", "Vision"].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ delay: i * 0.2 }}
              className={`rounded-3xl p-8 shadow-lg ${
                i === 0
                  ? "bg-gradient-to-br from-blue-200 to-white"
                  : "bg-gradient-to-br from-cyan-200 to-white"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 ${
                  i === 0 ? "bg-blue-600" : "bg-cyan-600"
                }`}
              >
                {i === 0 ? <FaHospital /> : <FaUserMd />}
              </div>
 
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                Our {item}
              </h2>
 
              <p className="text-slate-600 leading-7">
                {i === 0
                  ? "Deliver reliable digital healthcare systems that improve hospital operations."
                  : "Build secure and intelligent healthcare platforms for the future."}
              </p>
            </motion.div>
          ))}
 
        </div>
 
        {/* SERVICES */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
 
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Premium Services
          </h2>
 
          <div className="grid md:grid-cols-4 gap-6">
 
            {cards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ delay: index * 0.15 }}
                className={`bg-gradient-to-b ${item.bg} rounded-2xl p-6 text-center shadow-md`}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`w-14 h-14 mx-auto rounded-2xl ${item.iconbg} text-white flex items-center justify-center text-xl mb-4`}
                >
                  {item.icon}
                </motion.div>
 
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>
 
                <p className="text-sm text-slate-600 mt-2">
                  {item.text}
                </p>
              </motion.div>
            ))}
 
          </div>
        </div>
 
        {/* TRUST */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-blue-200 via-cyan-100 to-indigo-100 rounded-3xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Why Patients Trust Us
          </h2>
 
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Executive healthcare interface",
              "Secure medical data protection",
              "Fast digital workflows",
              "Enterprise-ready platform",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl p-5 shadow-md text-slate-700"
              >
                ✔ {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
 
      </div>
    </div>
  );
}
 