import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AddDoctor() {

  const [page, setPage] = useState("manage");

  return (
    <div className="p-6">
      <div className="mb-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-3 rounded"
          onClick={() => setPage("manage")}
        >
          Manage Doctors
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setPage("add")}
        >
          Add Doctor
        </button>
      </div>

      {page === "add" ? <AddDoctorDetails /> : <ManageDoctors />}

    </div>
  );
}

/* ================= ADD DOCTOR ================= */

function AddDoctorDetails() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    alert("Doctor Added Successfully");
  };

  const password = watch("password");

  function imageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="bg-white p-6 shadow rounded w-3/4">

      <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Specialization"
          {...register("specialization", { required: true })}
        />
        {errors.specialization && <p className="text-red-500">Required</p>}

        <input
          className="border p-2 w-full mb-2"
          placeholder="Doctor Name"
          {...register("doctorName", { required: true })}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Clinic Address"
          {...register("clinicAddress", { required: true })}
        />

        <input
          type="number"
          className="border p-2 w-full mb-2"
          placeholder="Fees"
          {...register("fees")}
        />

        <input
          type="number"
          className="border p-2 w-full mb-2"
          placeholder="Contact"
          {...register("contact")}
        />

        <input
          type="email"
          className="border p-2 w-full mb-2"
          placeholder="Email"
          {...register("email")}
        />

        <input
          type="file"
          className="mb-3"
          {...register("photo")}
          onChange={imageChange}
        />

        {preview && (
          <img
            src={preview}
            alt="doctor"
            className="w-32 h-32 mb-3"
          />
        )}

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password || "Password not match"
          })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Submit
        </button>

      </form>
    </div>
  );
}

/* ================= MANAGE DOCTORS ================= */

function ManageDoctors() {

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-4">
        Doctors List
      </h2>

      <table className="w-full border">

        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Fees</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>

        <tbody>
          {/* doctor data will come here later */}
        </tbody>

      </table>

    </div>
  );
}

export default AddDoctor;