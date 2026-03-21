import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate , Link} from "react-router-dom";

import HomePageGallery from "./HomePageGallery";

function HomePage3() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
  if (!name || !email || !mobileNumber || !message) {
    alert("All fields are required");
    return;
  }

  const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!gmailPattern.test(email)) {
    alert("Please enter a valid Gmail address (example@gmail.com)");
    return;
  }

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

    setName("");
    setEmail("");
    setMobileNumber("");
    setMessage("");
  } catch (err) {
    alert("Error sending message");
  }
};

  return (
    <div className="w-full h-auto flex items-center flex-col gap-10 ">
      <div id="galleryDiv" className="w-100 h-20  flex justify-center items-center rounded-2xl font-bold text-3xl md:text-4xl text-center">
        Our Gallery
      </div>
      <div >
        <HomePageGallery />



      </div>
      <div className=" w-[90vw] md:w-[80vw] flex flex-col gap-8 ">
        <h1 className="font-bold text-3xl md:text-4xl mx-4 md:mx-10 my-5">Contact Form</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Name : </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Email address : </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Mobile Number : </label>
          <input
            type="number"
            placeholder="Enter mobile"
            className="w-full border p-2"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Enter Message : </label>
          <input
            type="text"
            placeholder="Enter message"
            className="w-full border p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="px-4 md:px-10">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Send Message
          </button>
        </div>
      </div>

      <footer className="bg-gray-800 text-white w-full px-4 md:px-10 py-10 mt-10 ">
        <div className="flex flex-col ml-35 md:flex-row gap-10 md:gap-40">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-5">Useful Links</h2>

            <ul className="space-y-4 w-90 ">

              <li className="font-semibold border-b-2 pb-1 cursor-pointer">
              <Link to="/aboutus" className="flex justify-between border-b-2">
                About Us
                <span className="text-lg">{">"}</span>
              </Link>
            </li>

              <li className="font-semibold border-b-2 pb-1 cursor-pointer flex justify-between">
                <button
                  onClick={() =>
                    document
                      .getElementById("serviceDiv")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }>
                  Services <span className="text-lg">{">"}</span></button>
              </li>


              <li className="font-semibold border-b-2 pb-1 cursor-pointer flex justify-between">
                <button
                  onClick={() =>
                    document
                      .getElementById("loginDiv")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }>
                  Login and Registration<span className="text-lg">{">"}</span></button>
              </li>



              <li className="font-semibold border-b-2 pb-1 cursor-pointer flex justify-between">
                <button
                  onClick={() =>
                    document
                      .getElementById("galleryDiv")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Gallery <span className="text-lg">{">"}</span></button>
              </li>

            </ul>
          </div>

          <div id="ContactUs" className="ml-50">
            <h2 className="text-2xl md:text-4xl font-bold mb-5">Contact Us</h2>
            <ul className="space-y-3 text-base md:text-xl">
              <li>Davangere University, India</li>
              <li className="font-semibold">Phone : 9483773017</li>
              <li className="font-semibold">Email : cureonix@gmail.com</li>
              <li className="font-semibold">Timing : 9 AM To 8 PM</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default HomePage3;