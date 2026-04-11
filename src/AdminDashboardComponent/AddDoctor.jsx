import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaTrashAlt, FaImage, FaUserMd } from "react-icons/fa";


export default function AddDoctor() {
  const API = "https://localhost:7077/api/AddDoctors";

  const [view, setView] = useState("manage");
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    fees: "",
    contact: "",
    email: "",
    password: "",
    image: null,
  });

  // ✅ FETCH DOCTORS
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setDoctors(res.data);
    } catch (err) {
      console.error("GET ERROR:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ ADD DOCTOR
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("DoctorName", form.name);
      formData.append("Specialization", form.specialization);
      formData.append("Fee", form.fees);
      formData.append("Contact", form.contact);
      formData.append("Email", form.email);
      formData.append("Password", form.password);
      if (form.image) {
        formData.append("Image", form.image);
      }

      await axios.post(`${API}/add`, formData);

      alert("Doctor Added ✅");

      setForm({
        name: "",
        specialization: "",
        fees: "",
        contact: "",
        email: "",
        password: "",
        image: null,
      });

      setPreview(null);
      setView("manage");
      fetchDoctors();
    } catch (err) {
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctorId = (doc, index) => doc.id || doc.Id || doc.DoctorId || doc.doctorId || index;

  const filteredDoctors = doctors.filter((doc) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const name = (doc.DoctorName || doc.name || "").toString().toLowerCase();
    const specialization = (doc.Specialization || doc.specialization || "").toString().toLowerCase();
    const email = (doc.Email || doc.email || "").toString().toLowerCase();
    const contact = (doc.Contact || doc.contact || "").toString().toLowerCase();
    return (
      name.includes(query) ||
      specialization.includes(query) ||
      email.includes(query) ||
      contact.includes(query)
    );
  });

  return (
     <div className=" md:p-6 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between  items-start md:items-center mb-5 gap-4">
        <div>
          <h1 className="text-3xl font-black text-blue-600 tracking-tight">Manage Doctors</h1>
        </div>
        
        <div className="flex gap-3 bg-slate-100  rounded-xl">
          <button
            onClick={() => setView("manage")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "manage"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
          >
            Doctors
          </button>
          <button
            onClick={() => {
              setView("add");
              setForm({ name: "", specialization: "", fees: "", contact: "", email: "", password: "", image: null });
              setPreview(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === "add"
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
          >
            <FaPlus size={12} />
            Add Doctor
          </button>
        </div>
      </div>

      {/* ADD / EDIT DOCTOR FORM */}
      {view === "add" && (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm max-w-4xl mx-auto">
          {/* <h2 className="text-xl font-bold text-slate-800 mb-6">
            {editIndex !== null ? "Edit Doctor Information" : "New Doctor Profile"}
          </h2> */}
          <form onSubmit={handleSubmit} className="grid grid-row-1 md:grid-cols-2 gap-6">

            {/* Image Upload Area */}
            <div className="md:col-span-2 flex items-center gap-6 mb-2">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaImage className="text-slate-400 text-3xl group-hover:text-blue-500 transition-colors" />
                  )}
                </div>
                <label className="absolute inset-0 cursor-pointer rounded-full opacity-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
               <label className="cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-block">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder=""
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Specialization</label>
              <select
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              >
                <option value="" disabled>Select Specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Radiology">Radiology</option>
                <option value="Urology">Urology</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="doctor@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Contact Number</label>
              <input
                type="tel"
                name="contact"
                placeholder="+91"
                value={form.contact}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">Consultation Fees (₹)</label>
              <input
                type="number"
                name="fees"
                min="0"
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }
                }}
                placeholder="e.g. 500"
                value={form.fees}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700"> Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div className="md:col-span-2 pt-4 flex gap-4">
              <button
                type="submit"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition-all"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setView("manage")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MANAGE DOCTORS */}
      {view === "manage" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FaUserMd className="text-blue-500" />
              Manage Doctors
            </h2>
            <div className="relative inline-flex items-center">
              <FaSearch className="absolute left-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 w-64 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-black text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-slate-300">Doctor Name</th>
                  <th className="p-4 font-bold border-b border-slate-300">Specialization</th>
                  <th className="p-4 font-bold border-b border-slate-300">Contact</th>
                  <th className="p-4 font-bold border-b border-slate-300">Fees</th>
                  <th className="p-4 font-bold border-b border-slate-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-slate-500 font-medium">
                      No doctors found. Add a doctor to get started.
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doc, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-200">
                            {doc.preview || doc.Image || doc.image ? (
                              <img
                                src={doc.preview || doc.Image || doc.image}
                                alt="doctor"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaUserMd className="text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{doc.DoctorName || doc.name || doc.doctorName || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold inline-block">
                          {doc.Specialization || doc.specialization}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-700">{doc.Contact || doc.contact}</p>
                        <p className="text-xs font-medium text-slate-500">{doc.Email || doc.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-slate-800">₹{doc.Fee || doc.fees || doc.fee || ""}</p>
                      </td>
                      <td className="p-4 text-right space-x-2 transition-opacity">
                        <button
                          onClick={() => handleDelete(getDoctorId(doc, index))}
                          className="bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 p-2 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


