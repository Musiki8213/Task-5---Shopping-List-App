/**
 * ProfilePage — Edit profile and logout. Saves changes via JSON Server (localhost:5000/users/:id).
 */
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

      <div className="relative z-10 p-3 sm:p-4 max-w-xs sm:max-w-sm mx-auto py-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center">Profile</h1>

        <div className="backdrop-blur-[20px] bg-white/10 p-3 sm:p-4 rounded-2xl shadow-2xl space-y-1.5 sm:space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div>
            <label className="block mb-0.5 text-gray-300 text-xs">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-1.5 px-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-0.5 text-gray-300 text-xs">Surname</label>
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full py-1.5 px-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-0.5 text-gray-300 text-xs">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-1.5 px-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              type="email"
            />
          </div>

          <div>
            <label className="block mb-0.5 text-gray-300 text-xs">Cell</label>
            <input
              name="cell"
              value={formData.cell}
              onChange={handleChange}
              className="w-full py-1.5 px-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              type="text"
            />
          </div>

          <div>
            <label className="block mb-0.5 text-gray-300 text-xs">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-1.5 px-2 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              type="password"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-black w-full py-1.5 rounded hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm mt-1"
          >
            <img
              src="/verified-account.png"
              alt=""
              className="w-4 h-4"
            />
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-black w-full py-1.5 rounded hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm"
          >
            <img
              src="/logout (1).png"
              alt=""
              className="w-4 h-4"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
