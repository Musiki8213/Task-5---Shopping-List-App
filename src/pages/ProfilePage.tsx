import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { updateUser, logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    cell: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        cell: user.cell || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedUser = { ...user, ...formData };

    await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    dispatch(updateUser(updatedUser));
    alert("Profile updated successfully!");
    navigate("/home");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="relative min-h-screen bg-gray-900">
        <Navbar />
        <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[6px]"></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
          <p className="text-base sm:text-lg mb-4">You are not logged in.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black px-6 py-2 rounded hover:bg-white/20 transition text-sm sm:text-base"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[6px]"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-4 sm:p-6 max-w-xs sm:max-w-sm mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Profile</h1>

        <div className="backdrop-blur-[20px] bg-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl space-y-3 sm:space-y-4">
          {/* Form fields */}
          <div>
            <label className="block mb-1 text-gray-300 text-sm">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300 text-sm">Surname</label>
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300 text-sm">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              type="email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300 text-sm">Cell</label>
            <input
              name="cell"
              value={formData.cell}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300 text-sm">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
              type="password"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-black w-full py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <img
              src="/verified-account.png"
              alt="save"
              className="w-5 h-5 sm:w-6 sm:h-6"
            /> Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-black w-full py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <img
              src="/logout (1).png"
              alt="logout"
              className="w-5 h-5 sm:w-6 sm:h-6"
            /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
