import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import  { updateUser, logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save updates to JSON Server
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
  };

  // Logout user
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-4">You are not logged in.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Your Information</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Surname</label>
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cell</label>
            <input
              name="cell"
              value={formData.cell}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              type="password"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
