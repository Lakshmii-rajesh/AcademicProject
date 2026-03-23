import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddDoctor() {

  const API = "https://localhost:7077/api/AddDoctors";

  const [view, setView] = useState("manage");
  const [doctors, setDoctors] = useState([]);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    DoctorName: "",
    Specialization: "",
    Fee: "",
    Contact: "",
    Email: "",
    Password: "",
    Image: null
  });

  // ✅ FETCH DOCTORS
const fetchDoctors = async () => {
  try {
    const res = await axios.get(API);
    console.log("GET DATA:", res.data); // ✅ check data
    setDoctors(res.data);
  } catch (err) {
    console.error("GET ERROR:", err);
  }
};

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE IMAGE
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

      formData.append("DoctorName", form.DoctorName);
      formData.append("Specialization", form.Specialization);
      formData.append("Fee", form.Fee);
      formData.append("Contact", form.Contact);
      formData.append("Email", form.Email);
      formData.append("Password", form.Password);
      formData.append("Image", form.Image);

      await axios.post(`${API}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Doctor Added Successfully ✅");

      // reset form
      setForm({
        DoctorName: "",
        Specialization: "",
        Fee: "",
        Contact: "",
        Email: "",
        Password: "",
        Image: null
      });

      setPreview(null);
      setView("manage");
      fetchDoctors();

    }
catch (err) {
  console.error(err);

  alert(err.response?.data?.message || "Server error ❌");
}
  };

  // ✅ DELETE DOCTOR
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Doctor Management</h1>

      {/* BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Doctor
        </button>

        <button
          onClick={() => setView("manage")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Manage Doctors
        </button>
      </div>

      {/* ADD FORM */}
      {view === "add" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow flex flex-col gap-4"
        >

          <input
            name="DoctorName"
            placeholder="Doctor Name"
            value={form.DoctorName}
            onChange={handleChange}
            className="border p-2"
            required
          />

          <input
            name="Specialization"
            placeholder="Specialization"
            value={form.Specialization}
            onChange={handleChange}
            className="border p-2"
            required
          />

          <input
            name="Fee"
            type="number"
            placeholder="Fees"
            value={form.Fee}
            onChange={handleChange}
            className="border p-2"
            required
          />

          <input
            name="Contact"
            placeholder="Contact"
            value={form.Contact}
            onChange={handleChange}
            className="border p-2"
            required
          />

          <input
            name="Email"
            type="email"
            placeholder="Email"
            value={form.Email}
            onChange={handleChange}
            className="border p-2"
            required
          />

          <input
            name="Password"
            type="password"
            placeholder="Password"
            value={form.Password}
            onChange={handleChange}
            className="border p-2"
            required
          />

          {/* IMAGE */}
          <input type="file" accept="image/*" onChange={handleImage} required />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full"
            />
          )}

          <button className="bg-blue-600 text-white py-2 rounded">
            Add Doctor
          </button>

        </form>
      )}

      {/* DOCTORS TABLE */}
      {view === "manage" && (
        <div className="bg-white p-6 rounded-lg shadow">

          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th>Image</th>
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
                    No Doctors
                  </td>
                </tr>
              ) : (
                doctors.map((doc) => (
                  <tr key={doc.Id} className="text-center border-t">

                    <td>
                      <img
                        src={`https://localhost:7077/DoctorPhotos/${doc.Image}`}
                        alt="doctor"
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>

                    <td>{doc.DoctorName}</td>
                    <td>{doc.Specialization}</td>
                    <td>₹{doc.Fee}</td>
                    <td>{doc.Contact}</td>
                    <td>{doc.Email}</td>

                    <td>
                      <button
                        onClick={() => handleDelete(doc.Id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}