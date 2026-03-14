import React, { useState } from "react";

export default function AddDoctor() {

  const [view, setView] = useState("manage");
  const [doctors, setDoctors] = useState([]);
  const [preview, setPreview] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    fees: "",
    contact: "",
    email: "",
    password: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...doctors];
      updated[editIndex] = { ...form, preview };
      setDoctors(updated);
      setEditIndex(null);
    } else {
      setDoctors([...doctors, { ...form, preview }]);
    }

    setForm({
      name: "",
      specialization: "",
      fees: "",
      contact: "",
      email: "",
      password: "",
      image: ""
    });

    setPreview(null);
    setView("manage");
  };

  const handleEdit = (index) => {
    const doc = doctors[index];
    setForm(doc);
    setPreview(doc.preview);
    setEditIndex(index);
    setView("add");
  };

  const handleDelete = (index) => {
    const updated = doctors.filter((_, i) => i !== index);
    setDoctors(updated);
  };

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Doctor Management</h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>

        <button
          onClick={() => setView("manage")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Manage Doctors
        </button>
      </div>

      {/* ADD DOCTOR FORM */}
      {view === "add" && (

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow flex flex-col  md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="fees"
            placeholder="Consultation Fees"
            value={form.fees}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* Image Upload */}
          <div className="col-span-2 flex items-center gap-4">

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}

            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>

          </div>

          {/* Submit Button */}
          <button
            className=" bg-blue-600 text-white py-2 rounded"
          >
            {editIndex !== null ? "Update Doctor" : "Add Doctor"}
          </button>

        </form>
      )}

      {/* MANAGE DOCTORS */}
      {view === "manage" && (

        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-semibold mb-4">Doctors List</h2>

          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Specialization</th>
                  <th className="p-2">Fees</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              <tbody>

                {doctors.length === 0 ? (

                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No Doctors Added
                    </td>
                  </tr>

                ) : (

                  doctors.map((doc, index) => (

                    <tr key={index} className="text-center border-t">

                      <td className="p-2">
                        {doc.preview && (
                          <img
                            src={doc.preview}
                            alt="doctor"
                            className="w-12 h-12 rounded-full object-cover mx-auto"
                          />
                        )}
                      </td>

                      <td>{doc.name}</td>
                      <td>{doc.specialization}</td>
                      <td>₹{doc.fees}</td>
                      <td>{doc.contact}</td>
                      <td>{doc.email}</td>

                      <td className="space-x-2">

                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(index)}
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

        </div>
      )}

    </div>
  );
}