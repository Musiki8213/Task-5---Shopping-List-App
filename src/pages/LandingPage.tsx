import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar"; 

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Blurred background */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center "></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center backdrop-blur-[10px] p-10 rounded-2xl shadow-2xl max-w-lg text-center mx-auto mt-70">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to ShopMate
        </h1>
        <br></br>
        <p className="text-lg text-gray-200 mb-6">
          Smart shopping starts here. Add, track, and share your shopping lists
          with ease.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
