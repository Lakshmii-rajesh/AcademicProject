import React from "react";

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import HomePageGallery from "./HomePageGallery";

function HomePage3() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto flex items-center flex-col gap-10 ">
      <div id="galleryDiv" className="w-100 h-20  flex justify-center items-center rounded-2xl font-bold text-3xl md:text-4xl text-center">
        Our Gallery
      </div>
      <div > 
        <HomePageGallery/>
        


      </div>
      <div className=" w-[90vw] md:w-[80vw] flex flex-col gap-8 ">
        <h1 className="font-bold text-3xl md:text-4xl mx-4 md:mx-10 my-5">Contact Form</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Name : </label>
          <input type="text" placeholder="Enter your name" className=" w-full md:w-[50vw] border border-gray-400 p-2 rounded-md focus:outline-none" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Email address : </label>
          <input type="email" placeholder="Enter email address" className=" w-full md:w-[50vw] border border-gray-400 p-2 rounded-md focus:outline-none" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Mobile Number : </label>
          <input type="number" placeholder="Enter your mobile number" className=" w-full md:w-[50vw] border border-gray-400 p-2 rounded-md focus:outline-none" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 px-4 md:px-10">
          <label className="font-semibold text-lg md:text-xl min-w-37.5">Enter Message : </label>
          <input type="text" placeholder="Enter message" className=" w-full md:w-[50vw] border border-gray-400 p-2 rounded-md focus:outline-none" />
        </div>

        <div className="px-4 md:px-10">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 text-lg md:text-2xl rounded-xl font-semibold">
            Send Message
          </button>
        </div>
      </div>

      <footer className="bg-gray-800 text-white w-full px-4 md:px-10 py-10 mt-10 ">
        <div className="flex flex-col ml-35 md:flex-row gap-10 md:gap-40">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-5">Useful Links</h2>

            <ul className="space-y-4 w-90 ">

              <li className="font-semibold border-b-2 pb-1 cursor-pointer flex justify-between">
                <button
                  onClick={() =>
                    document
                      .getElementById("galleryDiv")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  About us <span className="text-lg">{">"}</span></button>
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

          <div id="ContactUs"  className="ml-50">
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