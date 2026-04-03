import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaShieldAlt, FaUserMd } from "react-icons/fa";
import Button from "../components/Button";

const images = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
];

function HomePage1() {
  const [current, setCurrent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="HomePage" className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {/* PROFESSIONAL STICKY NAVIGATION */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-6 py-4 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 py-3" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollTo('HomePage')}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform">
              <span className="text-xl font-black">+</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">CUREONIX</h1>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <NavBtn onClick={() => scrollTo('HomePage')}>Overview</NavBtn>
            <Link to="/aboutus" className="text-sm font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">About Facility</Link>
            <NavBtn onClick={() => scrollTo('loginDiv')}>Clinical Portals</NavBtn>
            <NavBtn onClick={() => scrollTo('ContactUs')}>Contact</NavBtn>
            
            <div className="h-6 w-px bg-slate-200 mx-2" />
            
            <button variant="secondary" className="px-6 h-9 text-sm font-black bg-blue-500 rounded-2xl text-white  uppercase tracking-widest transition-colors" onClick={() => navigate("/patient-register")}>
              Register Patient
            </button>
            <button className="px-6 h-9 text-sm font-black bg-blue-500 rounded-2xl text-white  uppercase tracking-widest transition-colors" onClick={() => scrollTo('loginDiv')}>
              Secure Login
            </button>
          </div>
        </div>
      </nav>

      {/* PREMIUM HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
            >
              <img src={img} alt="Hospital" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl animate-fadeInUp">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-black text-[10px] uppercase tracking-widest mb-8">
                <FaShieldAlt /> Accredited Healthcare Excellence
             </div>
             <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8">
                Precision Care for a <span className="text-blue-600">Healthier Future.</span>
             </h2>
             <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl">
                CUREONIX integrates advanced medical technology with compassionate expertise to provide a seamless healthcare ecosystem for patients and professionals.
             </p>
             <div className="flex flex-wrap gap-4">
                {/* <Button className="h-16 px-10 text-base group" onClick={() => scrollTo('loginDiv')}>
                  Schedule Appointment <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button> */}
                <button 
                  onClick={() => scrollTo('serviceDiv')}
                  className="h-16 px-10 bg-white border-2 border-slate-200 text-slate-900 font-black rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-3"
                >
                  Explore Services
                </button>
             </div>
          </div>
        </div>

        {/* STATS OVERLAY */}
        <div className="absolute bottom-12 right-12 hidden xl:flex gap-8 animate-fadeInRight">
           <HeroStat val="24/7" label="Critical Care" />
           <HeroStat val="15k+" label="Served Patients" />
           <HeroStat val="450+" label="Medical Specialists" />
        </div>
      </section>

      {/* CORE VALUE PROPOSITION */}
      <section className="py-24 bg-white relative">
         <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <ValueProp 
                  icon={<FaCalendarAlt />} 
                  title="Digital Scheduling" 
                  desc="Instant verified booking with our top-tier medical specialists across all departments."
               />
               <ValueProp 
                  icon={<FaUserMd />} 
                  title="Specialist Network" 
                  desc="Direct access to board-certified professionals utilizing the latest clinical breakthroughs."
               />
               <ValueProp 
                  icon={<FaShieldAlt />} 
                  title="Patient Integrity" 
                  desc="Your medical history and clinical data are protected with enterprise-grade security protocols."
               />
            </div>
         </div>
      </section>
    </div>
  );
}

function NavBtn({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="text-sm font-black text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors"
    >
      {children}
    </button>
  );
}

function HeroStat({ val, label }) {
  return (
    <div className="p-8 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-2xl shadow-slate-900/10 min-w-[12rem] text-center">
       <p className="text-4xl font-black text-slate-900 mb-1">{val}</p>
       <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ValueProp({ icon, title, desc }) {
  return (
    <div className="group">
       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl text-slate-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
          {icon}
       </div>
       <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
       <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

export default HomePage1;