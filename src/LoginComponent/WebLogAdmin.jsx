import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function WebLogAdmin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [signUpemail, setsignUpemail] = useState("");
  const [signUppassword, setSignUppassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    let value = e.target.value;
    const atIndex = value.indexOf("@");
    if (atIndex !== -1) {
      const typedDomain = value.slice(atIndex + 1);
      if (typedDomain === "") value = value + "gmail.com";
    }
    setsignUpemail(value); // fixed setter
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!signUpemail || !signUppassword || (!isLogin && !confirmpassword)) {
      setMessage("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpemail)) {
      setMessage("Please enter a valid email!");
      return;
    }

    if (signUppassword.length < 6) {
      setMessage("Password must be at least 6 characters!");
      return;
    }


    if (!isLogin && signUppassword !== confirmpassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const url = isLogin
        ? "https://localhost:7149/api/Admin/Login"
        : "https://localhost:7149/api/Admin/Signup";
       

      const body = isLogin
      ? { email: signUpemail, password: signUppassword }  // important: keys match C# model
      : { signUpemail, signUppassword, confirmpassword };


      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage(text);
        return;
      }

      if (isLogin) {
        setMessage("Login successfully");
         navigate("/admin-dashboard");
        
      } else {
        setMessage("Signup successfully");
        setIsLogin(true);
        setSignUppassword("");
        setConfirmpassword("");
      }
    } catch (err) {
      setMessage("Server not connected");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-300 to-purple-200 transition-all duration-500">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-lg shadow-purple-300/50 hover:shadow-xl transition-shadow duration-300 w-96">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={signUpemail}
            onChange={handleEmailChange}
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:shadow-lg transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={signUppassword}
            onChange={(e) => setSignUppassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:shadow-lg transition-all duration-300"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:shadow-lg transition-all duration-300"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r  from-indigo-500 to-purple-400 text-white rounded-xl font-semibold hover:scale-105 hover:opacity-90 transition-all duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm font-medium ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            } transition-colors duration-300`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-purple-600 font-semibold cursor-pointer hover:underline ml-1 transition-all duration-300"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default WebLogAdmin;
