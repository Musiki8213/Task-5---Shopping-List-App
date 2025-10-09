import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShopMate</h1>
      <p className="text-lg text-gray-600 mb-6">
        Smart shopping starts here. Add, track, and share your shopping lists with ease.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
