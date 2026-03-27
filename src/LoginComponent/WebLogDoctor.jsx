import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios"; // ✅ IMPORTANT

function WebLogDoctor() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [forgot, setForgot] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    if (forgot) {
      console.log('forgot data', data);
      alert('If an account exists we have sent reset instructions.');
      return;
    }

    try {
      // ✅ CALL LOGIN API
      const res = await axios.post(
        "https://localhost:7077/api/AddDoctors/DoctorLogin", // 🔁 change if needed
        {
          email: data.email,
          password: data.password,
        }
      );

      console.log("✅ LOGIN SUCCESS:", res.data);

      // ✅ SAVE USER (VERY IMPORTANT FOR PROFILE PAGE)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
        })
      );

      alert("Logged in successfully");

      // ✅ NAVIGATE TO DASHBOARD
      navigate("/doctor-dashboard");

    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div 
      className="h-screen pl-20 w-full flex justify-start items-center bg-cover bg-center"
      style={{ backgroundImage: "url('LoginForm.jpeg')" }}
    >

      <div className="absolute inset-0 bg-black/40"></div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="relative z-10 w-[90%] sm:w-100"
      >
        <div className="w-full max-w-md rounded-3xl p-6 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40">

          <img 
            src="public/project Logo.png" 
            className="h-20 w-20 rounded-full object-cover mx-auto mb-6" 
            alt="logo"
          />

          {forgot ? (
            <>
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 
                           text-black placeholder-black outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              <p className="text-red-400 text-sm">{errors.email?.message}</p>

              {/* NEW PASSWORD */}
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 
                           text-black placeholder-black outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum 10 characters",
                  },
                })}
              />
              <p className="text-red-400 text-sm">{errors.password?.message}</p>

              <div className="flex flex-col gap-3 mt-6">
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
                  Reset Password
                </button>

                <button
                  type="button"
                  onClick={() => setForgot(false)}
                  className="w-full border border-white/40 text-white py-3 rounded-lg"
                >
                  Back to Login
                </button>
              </div>
            </>
          ) : (
            <>
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 
                           text-black placeholder-black outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              <p className="text-red-400 text-sm">{errors.email?.message}</p>

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-3 rounded-lg bg-white/30 border border-white/40 
                           text-black placeholder-black outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum 10 characters",
                  },
                })}
              />
              <p className="text-red-400 text-sm">{errors.password?.message}</p>

              {/* FORGOT */}
              <div className="flex justify-between text-sm text-white mt-2">
                <span 
                  className="cursor-pointer underline"
                  onClick={() => setForgot(true)}
                >
                  Forgot password ?
                </span>
              </div>

              {/* LOGIN BUTTON */}
              <div className="flex flex-col gap-3 mt-6">
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
                  Login
                </button>
              </div>
            </>
          )}

          {/* BACK */}
          <button 
            type="button"
            onClick={() => navigate("/")} 
            className="mt-4 block mx-auto text-black"
          >
             ← Back
          </button>

        </div>
      </form>
    </div>
  )
}

export default WebLogDoctor;