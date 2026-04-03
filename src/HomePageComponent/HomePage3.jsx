import React, { useState } from "react";
import axios from "axios";
import { Navigate} from "react-router-dom";
import { useNavigate , Link} from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Card from "../components/Card.jsx"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"


import HomePageGallery from "./HomePageGallery";

export default function HomePage3() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async () => {
  //   const { name, email, mobileNumber, message } = formData;
  //   if (!name || !email || !mobileNumber || !message) {
  //     alert("Verification required: Please populate all inquiry fields.");
  //     return;
  //   }

    
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  const { name, email, mobileNumber, message } = formData;

  if (!name || !email || !mobileNumber || !message) {
    alert("All fields are required");
    return;
  }

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!gmailPattern.test(email)) {
    alert("Please enter a valid Gmail address (example@gmail.com)");
    return;
  }

  setIsLoading(true); // ✅ moved inside function

  try {
    const res = await axios.post(
      "https://localhost:7077/api/ContactMessage/submit",
      {
        name,
        email,
        mobileNumber,
        message,
      }
    );

    alert(res.data.message);

    // ✅ reset form correctly
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      message: "",
    });

  } catch (err) {
    alert("Error sending message");
  } finally {
    setIsLoading(false); // ✅ important
  }
};

  return (
    <div className="w-full h-auto flex items-center flex-col gap-10 ">
      <div id="galleryDiv" className="py-24 bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="container mx-auto px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
             <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Visual Portfolio</span>
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Inside Our Facility.</h2>
             <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">Explore our advanced medical infrastructure and collaborative clinical environments.</p>
          </div>
          <HomePageGallery />
        </div>
      </div>

      <section id="ContactUs" className="py-32 w-full bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-30 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full blur-[100px] opacity-20 -ml-32 -mb-32" />
        
        <div className="container mx-auto px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* CONTACT INFO */}
              <div className="space-y-12">
                 <div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">Let's Connect.</h2>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">Our support team is available 24/7 to assist with appointment logistics and facility inquiries.</p>
                 </div>

                 <div className="space-y-8">
                    <ContactDetail icon={<FaMapMarkerAlt />} label="Facility Headquarters" val="Cureonix Medical Plaza, Davangere University, India" />
                    <ContactDetail icon={<FaPhoneAlt />} label="Clinical Inquiries" val="+91 94837 73017" />
                    <ContactDetail icon={<FaEnvelope />} label="Communication Hub" val="support@cureonix.com" />
                    <ContactDetail icon={<FaClock />} label="Operational Hours" val="Residency Access: 24/7 • OPD: 9 AM To 8 PM" />
                 </div>

                 <div className="flex gap-4 pt-4">
                    <SocialBtn icon={<FaFacebookF />}/>
                    <SocialBtn icon={<FaTwitter />} />
                    <SocialBtn icon={<FaLinkedinIn />} />
                    <SocialBtn icon={<FaInstagram />} />
                 </div>
              </div>

              {/* INQUIRY FORM */}
                <Card className="p-10 md:p-12 rounded-3xl shadow-xl border border-slate-200 bg-white/70 backdrop-blur-2xl">
                 <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <Input label="Identity Name" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. John Doe" className="bg-slate-100 border-none rounded-2xl h-14 px-4 text-slate-600 placeholder-slate-400"/>
                       <Input label="Contact Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@gmail.com" className="bg-slate-100 border-none rounded-2xl h-14 px-4 text-slate-600 placeholder-slate-400" />
                    </div>
                    <Input label="Mobile Protocol" type="number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="+91 00000 00000" className="bg-slate-100 border-none rounded-2xl h-14 px-4 text-slate-600 placeholder-slate-400"/>
                    <div className="space-y-1.5 min-h-[160px] flex flex-col">
                       <label className="text-sm font-bold text-slate-700 ml-1">Transmission Message</label>
                       <textarea 
                          name="message"
                          className="bg-slate-100 rounded-2xl border-none px-4 py-4 text-slate-600 placeholder-slate-400 resize-none h-40 focus:outline-none"
                          placeholder="How can our practitioners assist you today?"
                          value={formData.message}
                          onChange={handleChange}
                       />
                    </div>
                    <Button onClick={handleSubmit}   className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300"
                       disabled={isLoading}>
                       {isLoading ? "Transmitting..." : "Send Inquiry Request"} <FaPaperPlane className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                 </div>
              </Card>
           </div>
        </div>
      </section>


      {/* PROFESSIONAL FOOTER */}
      <footer className="bg-slate-900 py-16 text-slate-400">
         <div className="container mx-auto px-8 border-b border-slate-800 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
               <div className="lg:col-span-1 space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <span className="text-lg font-black">+</span>
                    </div>
                    <h1 className="text-xl font-black text-white tracking-tighter">CUREONIX</h1>
                  </div>
                  <p className="text-sm leading-relaxed font-medium">Elevating healthcare through digital integration and board-certified medical excellence. Trusted by thousands monthly.</p>
               </div>

               <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8">Clinical Access</h4>
                  <ul className="space-y-4 text-sm font-medium">
                     <li><FooterLink label="Specialist Directory" /></li>
                     <li><FooterLink label="Schedule Appointment" /></li>
                     <li><FooterLink label="Medical Archives" /></li>
                     <li><FooterLink label="Emergency Protocol" /></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8">Institution</h4>
                  <ul className="space-y-4 text-sm font-medium">
                     <li><FooterLink label="About CUREONIX" to="/aboutus" /></li>
                     <li><FooterLink label="Academic Research" /></li>
                     <li><FooterLink label="Career Opportunities" /></li>
                     <li><FooterLink label="Inquiry Hub" id="ContactUs" /></li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8">Legal Compliance</h4>
                  <ul className="space-y-4 text-sm font-medium">
                     <li><FooterLink label="Privacy Mandate" /></li>
                     <li><FooterLink label="Patient Terms" /></li>
                     <li><FooterLink label="Data Encryption" /></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="container mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-60">
            <p>&copy; 2026 CUREONIX Medical Ecosystem. All rights reserved.</p>
            <p className="text-blue-500">Excellence in Healthcare</p>
         </div>
      </footer>
    </div>
  );

}


function ContactDetail({ icon, label, val }) {
  return (
    <div className="flex items-start gap-5">
       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 flex-shrink-0">
          {icon}
       </div>
       <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-slate-900 font-bold">{val}</p>
       </div>
    </div>
  );
}

function SocialBtn({ icon }) {
  return (
    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
       {icon}
       
    </button>
  );
}

function FooterLink({ label, to, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) navigate(to);
    else if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <button onClick={handleClick} className="hover:text-blue-500 transition-colors text-left uppercase text-[11px] tracking-tight">
       {label}
    </button>
  );
}