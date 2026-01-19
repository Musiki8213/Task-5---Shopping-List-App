import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Blurred background */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center "></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center backdrop-blur-[8px] p-4 sm:p-6 md:p-10 rounded-2xl shadow-2xl max-w-xs sm:max-w-sm md:max-w-lg text-center mx-auto mt-10 sm:mt-20 md:mt-32 lg:mt-40 border border-white/20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
          Welcome to ShopMate
        </h1>
        <br className="hidden sm:block"></br>
        <p className="text-base sm:text-lg text-gray-200 mb-4 sm:mb-6">
          Smart shopping starts here. Add, track, and share your shopping lists
          with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/login"
            className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base text-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
