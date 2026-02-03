/**
 * RegisterPage — User registration form.
 * Talks to JSON Server at http://localhost:5000/users for GET (check email) and POST (create user).
 * Run the API with: npm run server (or npm run dev:all).
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

/** Base URL for the JSON Server API. Must be running for register/login to work. */
const API_BASE = "http://localhost:5000";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    cell: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    cell: "",
    general: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleRegister = async () => {
    const newErrors: typeof errors = {
      name: "",
      surname: "",
      email: "",
      password: "",
      cell: "",
      general: "",
    };

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.cell) newErrors.cell = "Cell number is required";

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const res = await fetch(`${API_BASE}/users`);
      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          general: "Server error. Is the API running? Try: npm run server",
        }));
        return;
      }
      const users = await res.json();

      if (users.some((u: { email: string }) => u.email === formData.email)) {
        setErrors((prev) => ({ ...prev, email: "Email already registered" }));
        return;
      }

      const newUser = {
        ...formData,
        password: btoa(formData.password),
        id: Date.now(),
      };

      const postRes = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!postRes.ok) {
        setErrors((prev) => ({
          ...prev,
          general: "Failed to create account. Try again.",
        }));
        return;
      }

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      const msg =
        err instanceof TypeError && err.message === "Failed to fetch"
          ? "Cannot connect to server. Start it with: npm run server (or npm run dev:all)"
          : "Something went wrong. Try again.";
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setLoading(false);
    }
  };

  /** Returns input className; red border when field has error */
  const inputClass = (field: keyof typeof errors) =>
    `py-1.5 px-2 w-full rounded placeholder-gray-400 focus:outline-none focus:ring-2 text-sm ${
      errors[field]
        ? "border-2 border-red-500"
        : "bg-white text-black focus:ring-white"
    }`;

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[5px]"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form card — compact so Register button stays visible */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-4">
        <div className="backdrop-blur-[8px] p-4 sm:p-5 rounded-2xl shadow-2xl max-w-xs sm:max-w-sm w-full text-center border border-white/20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">Register</h1>

          {errors.general && (
            <p className="text-red-500 mb-2 text-xs">{errors.general}</p>
          )}

          <div className="space-y-1.5 sm:space-y-2 text-left">
            <div>
              <label className="block text-gray-300 mb-0.5 text-xs">Name</label>
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-0.5 text-xs">Surname</label>
              <input
                name="surname"
                placeholder="Surname"
                onChange={handleChange}
                className={inputClass("surname")}
              />
              {errors.surname && (
                <p className="text-red-500 text-xs mt-0.5">{errors.surname}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-0.5 text-xs">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-0.5 text-xs">Cell Number</label>
              <input
                name="cell"
                placeholder="Cell Number"
                onChange={handleChange}
                className={inputClass("cell")}
              />
              {errors.cell && (
                <p className="text-red-500 text-xs mt-0.5">{errors.cell}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-0.5 text-xs">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className={inputClass("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="bg-black text-white w-full py-1.5 rounded-lg hover:bg-green-800 transition text-sm mt-1"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <p className="text-gray-300 text-xs mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
