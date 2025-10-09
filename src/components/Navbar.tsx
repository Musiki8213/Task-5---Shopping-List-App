import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-[15px] p-6  shadow-md text-white relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center ">
          <div >
            <Link to="/" className="text-2xl font-bold">
              ShopMate
            </Link>
          </div>
          <div className="flex space-x-22 ">
            <Link to="/about" className="hover:text-gray-400 transition ">
              About Us
            </Link>
            <Link to="/register" className="hover:text-gray-400 transition">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-gray-400 transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
