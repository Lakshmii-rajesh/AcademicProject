import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginPatient, forgetPasswordPatient } from "./PatientService"; // Axios services

function WebLogPatient() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [forgot, setForgot] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (forgot) {
        // Forget password
        const res = await forgetPasswordPatient({ email: data.email, newpassword: data.password });
        alert(res);
        setForgot(false);
      } else {
        // Login
        const res = await loginPatient({ email: data.email, password: data.password });
        alert(res);
        navigate("/patient-dashboard");
      }
    } catch (err) {
      alert(err.message || err);
    }
  };

  return (
    <div 
      className="h-screen pl-20 w-full flex justify-start items-center bg-cover bg-center"
      style={{ backgroundImage: "url('LoginForm.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 w-[90%] sm:w-100">
        <div className="w-full max-w-md rounded-3xl p-6 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40">
          <img src="/logo.png" className="h-20 w-20 rounded-full object-cover mx-auto mb-6" alt="logo" />

          {forgot ? (
            <>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
                {...register("email", { required: "Email is required" })}
              />
              <p className="text-red-400 text-sm">{errors.email?.message}</p>

              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
                {...register("password", { required: "Password is required" })}
              />
              <p className="text-red-400 text-sm">{errors.password?.message}</p>

              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-6">Reset Password</button>
              <button type="button" onClick={() => setForgot(false)} className="w-full border border-white/40 text-white py-3 rounded-lg mt-2">Back to Login</button>
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
                {...register("email", { required: "Email is required" })}
              />
              <p className="text-red-400 text-sm">{errors.email?.message}</p>

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 text-black placeholder-black outline-none cursor-pointer"
                {...register("password", { required: "Password is required" })}
              />
              <p className="text-red-400 text-sm">{errors.password?.message}</p>

              <div className="flex justify-between text-sm text-white mt-2">
                <span className="cursor-pointer underline" onClick={() => setForgot(true)}>Forgot password?</span>
              </div>

              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-6">Login</button>
              <button type="button" onClick={() => navigate("/patient-register")} className="w-full border border-white/40 text-white py-3 rounded-lg mt-2">Register</button>
            </>
          )}

          <button type="button" onClick={() => navigate("/")} className="mt-4 block mx-auto text-black">← Back</button>
        </div>
      </form>
    </div>
  );
}

export default WebLogPatient;