import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const images = [
  "https://admin.expatica.com/ae/wp-content/uploads/sites/15/2023/11/Healthcare-basics.jpg",
  "/i6.png"   // public folder image
];

function HomePage1() {
  const [current, setCurrent] = useState(0);
const navigate = useNavigate();
  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div id="HomePage" className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md">

        <div className="container mx-auto flex justify-between items-center p-4 ">

          <h1 className="text-2xl font-bold tracking-wide">

            <span className="text-pink-200">+</span>  CUREONIX
          </h1>
          <nav className="space-x-6 hidden md:block">
            <button
              onClick={() =>
                document
                  .getElementById("HomePage")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              Home</button>
            <Link to="/aboutus">About Us</Link>
            <button
              onClick={() =>
                document
                  .getElementById("loginDiv")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              Online appointments</button>
            <button
              onClick={() =>
                document
                  .getElementById("loginDiv")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              Login</button>
            <button onClick={() => navigate("/patient-register")} >
              Registration</button>
            <button
              onClick={() =>
                document
                  .getElementById("ContactUs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              Contact Us</button>
          </nav>
        </div>
      </header>
      {/* Hero / Carousel */}
      <div className="relative w-full h-100 overflow-hidden">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition-all duration-700"
        />
        {/* Controls */}
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 px-3 py-2 rounded-full hover:bg-opacity-80 cursor-pointer"
          onClick={() =>
            setCurrent((current - 1 + images.length) % images.length)
          }
        >
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 px-3 py-2 rounded-full hover:bg-opacity-80 cursor-pointer"
          onClick={() => setCurrent((current + 1) % images.length)}
        >
        </button>
      </div>
      {/* About Section */}
      <section className="container mx-auto text-center py-12 px-6">
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">
          Welcome to CUREONIX Hospital Management System
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We provide easy online appointments, patient management, doctor
          scheduling, and hospital facilities all in one system. Your health and
          time are our priority.
        </p>
      </section>
    </div>
  );
}
export default HomePage1;