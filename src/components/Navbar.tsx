import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-[15px] p-4 sm:p-6 shadow-md text-white relative z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-auto sm:h-16 items-center">
          {/* Logo */}
          <div>
            <Link to="/" className="text-xl sm:text-2xl font-bold">
              ShopMate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          {/* Navigation links */}
          <div
            className={`${
              isMenuOpen
                ? "absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md flex flex-col space-y-3 p-4 sm:hidden"
                : "hidden sm:flex space-x-4 md:space-x-6"
            }`}
          >
            <Link
              to="/about"
              className="hover:text-gray-400 transition text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/register"
              className="hover:text-gray-400 transition text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="hover:text-gray-400 transition text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/profile"
              className="hover:text-gray-400 transition text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
