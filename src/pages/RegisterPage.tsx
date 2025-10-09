import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/NavBar";

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
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleRegister = async () => {
    const newErrors: typeof errors = { name: "", surname: "", email: "", password: "", cell: "", general: "" };

    // Validation
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.cell) newErrors.cell = "Cell number is required";

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({ ...errors, general: "" });

    try {
      const res = await fetch("http://localhost:5000/users");
      const users = await res.json();

      if (users.some((u: any) => u.email === formData.email)) {
        setErrors({ ...errors, email: "Email already registered" });
        setLoading(false);
        return;
      }

      const newUser = {
        ...formData,
        password: btoa(formData.password),
        id: Date.now(),
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setErrors({ ...errors, general: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof typeof errors) =>
    `p-2 w-full rounded placeholder-gray-400 focus:outline-none focus:ring-2 ${
      errors[field] ? "border-2 border-red-500" : "bg-white text-black focus:ring-white"
    }`;

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[5px]"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="backdrop-blur-[20px] p-8 rounded-2xl shadow-2xl max-w-md w-full text-center mb-20">
          <h1 className="text-3xl font-bold mb-6 text-white">Register</h1>

          {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}

          <div className="space-y-4 text-left">
            <div>
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className={inputClass("name")}
              />
              {errors.name && <p className="text-red-500  text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="surname"
                placeholder="Surname"
                onChange={handleChange}
                className={inputClass("surname")}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                name="cell"
                placeholder="Cell Number"
                onChange={handleChange}
                className={inputClass("cell")}
              />
              {errors.cell && <p className="text-red-500 text-sm mt-1">{errors.cell}</p>}
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className={inputClass("password")}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="bg-black text-white w-full py-2 rounded-lg hover:bg-green-800 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <p className="text-gray-300 text-sm mt-4">
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
