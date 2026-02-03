/**
 * Navbar — Top navigation. When logged in: Home, About Us, Profile. When logged out: About Us, Sign Up, Login.
 */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="backdrop-blur-[15px] p-4 sm:p-6 shadow-md text-white relative z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-auto sm:h-16 items-center">
          <div>
            <Link to={user ? "/home" : "/"} className="text-xl sm:text-2xl font-bold">
              ShopMate
            </Link>
          </div>

          {/* Mobile menu button — hamburger icon */}
          <button
            type="button"
            className="sm:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen
                ? "absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md flex flex-col space-y-3 p-4 sm:hidden"
                : "hidden sm:flex space-x-4 md:space-x-6"
            }`}
          >
            {user ? (
              <>
                <Link to="/home" className="hover:text-gray-400 transition text-sm sm:text-base" onClick={closeMenu}>
                  Home
                </Link>
                <Link to="/about" className="hover:text-gray-400 transition text-sm sm:text-base" onClick={closeMenu}>
                  About Us
                </Link>
                <Link to="/profile" className="hover:text-gray-400 transition text-sm sm:text-base" onClick={closeMenu}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="hover:text-gray-400 transition text-sm sm:text-base" onClick={closeMenu}>
                  About Us
                </Link>
                <Link to="/register" className="hover:text-gray-400 transition text-sm sm:text-base" onClick={closeMenu}>
                  Sign Up
                </Link>
                <Link to="/login" className="hover:text-gray-400 transition text-sm sm:text-base" onClick={closeMenu}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
