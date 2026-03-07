import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerPatient } from "./PatientService"; // Axios service

function PatientRegister() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password");
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Call backend register API
      const res = await registerPatient(data);
      alert(res); // Shows "Register successfully" from backend
      navigate("/patient-login"); // Redirect to login page
    } catch (err) {
      alert(err); // Shows backend error (like "Email already exists")
    }
  };

  return (
    <div 
      className="h-screen w-full flex justify-start items-center bg-cover bg-center"
      style={{ backgroundImage: "url('LoginForm.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 h-full mr-220 flex justify-center items-center md:px-20 relative z-10"
      >
        <div className="w-full rounded-3xl px-5 py-2 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40">
          <img src="/logo.jpeg" className="h-20 w-20 object-cover mx-auto rounded-full mb-3" alt="logo" />

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 my-2 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
            {...register("name", { required: "Name is required" })}
          />
          <p className="text-red-500">{errors.name?.message}</p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 my-2 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          <p className="text-red-500">{errors.email?.message}</p>

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full p-2 my-2 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
            {...register("phoneNum", {
              required: "Phone number is required",
              pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" },
            })}
          />
          <p className="text-red-500">{errors.phoneNum?.message}</p>

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 my-2 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Minimum 4 characters" },
              maxLength: { value: 10, message: "Maximum 10 characters" },
            })}
          />
          <p className="text-red-500">{errors.password?.message}</p>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 my-2 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />
          <p className="text-red-500">{errors.confirmPassword?.message}</p>

          {/* Image Upload */}
          <div className="flex flex-col items-start my-2">
            {preview && <img src={preview} alt="preview" className="w-20 h-20 rounded-full object-cover mb-3" />}
            <label className="cursor-pointer bg-white/30 border border-white/40 text-black px-4 py-2 rounded-md hover:bg-blue-500">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 cursor-pointer rounded-md mt-4">Register</button>

          <p className="mt-3 text-sm text-center text-black">
            Already have an account?
            <span onClick={() => navigate("/patient-login")} className="ml-1 font-semibold underline cursor-pointer">Login</span>
          </p>

          <button type="button" onClick={() => navigate("/")} className="mt-2 cursor-pointer block mx-auto p-2 font-bold text-black">← Back</button>
        </div>
      </form>
    </div>
  );
}

export default PatientRegister;