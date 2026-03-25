import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddDoctor() {
  const API = "https://localhost:7077/api/AddDoctors";

  const [view, setView] = useState("manage");
  const [doctors, setDoctors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    DoctorName: "",
    Specialization: "",
    Fee: "",
    Contact: "",
    Email: "",
    Password: "",
    Image: null,
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
      setForm({ ...form, Image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ ADD DOCTOR
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      await axios.post(`${API}/add`, formData);

      alert("Doctor Added ✅");

      setForm({
        DoctorName: "",
        Specialization: "",
        Fee: "",
        Contact: "",
        Email: "",
        Password: "",
        Image: null,
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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Doctor Management
      </h1>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Doctor
        </button>

        <button
          onClick={() => setView("manage")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Manage Doctors
        </button>
      </div>

      {/* ADD FORM */}
      {view === "add" && (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow flex flex-col gap-4"
        >
          <input
            name="DoctorName"
            placeholder="Doctor Name"
            value={form.DoctorName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="Specialization"
            value={form.Specialization}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Specialization</option>
            <option>Dental</option>
            <option>Cardiology</option>
            <option>Eye</option>
            <option>Orthopedic</option>
            <option>Neurology</option>
            <option>Dermatology</option>
            <option>ENT</option>
            <option>Gynecology</option>
            <option>Pediatrics</option>
            <option>General Medicine</option>
          </select>

          <input
            name="Fee"
            type="number"
            placeholder="Fees"
            value={form.Fee}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="Contact"
            placeholder="Contact"
            value={form.Contact}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="Email"
            type="email"
            placeholder="Email"
            value={form.Email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="Password"
            type="password"
            placeholder="Password"
            value={form.Password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input type="file" accept="image/*" onChange={handleImage} required />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full mx-auto"
            />
          )}

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Add Doctor
          </button>
        </form>
      )}

      {/* TABLE */}
      {view === "manage" && (
        <div className="bg-white p-6 rounded-xl shadow">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Image</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Fees</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No Doctors Found
                    </td>
                  </tr>
                ) : (
                  doctors.map((doc) => (
                    <tr
                      key={doc.id || doc.Id || doc.Email}
                      className="text-center border-t hover:bg-gray-50"
                    >
                      <td className="p-2">
                        <img
  src={
    doc.image || doc.Image
      ? doc.image || `data:image/jpeg;base64,${doc.Image}`
      : "https://via.placeholder.com/50"
  }
  alt="doctor"
  className="w-12 h-12 rounded-full mx-auto object-cover"
/>
                      </td>

                      <td>{doc.doctorName || doc.DoctorName}</td>
                      <td>{doc.specialization || doc.Specialization}</td>
                      <td>₹{doc.fee || doc.Fee}</td>
                      <td>{doc.contact || doc.Contact}</td>
                      <td>{doc.email || doc.Email}</td>

                      <td>
                        <button
                          onClick={() => handleDelete(doc.id || doc.Id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}