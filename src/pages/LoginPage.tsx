import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    field?: "email" | "password";
    message: string;
  }>({ message: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError({ message: "Please enter both email and password." });
      return;
    }

    setError({ message: "" });
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/users");

      if (!res.ok) {
        throw new Error("Failed to connect to server.");
      }

      const users = await res.json();

      const user = users.find((u: any) => u.email === email);

      if (!user) {
        setError({ field: "email", message: "Email not found." });
        setLoading(false);
        return;
      }

      if (atob(user.password) !== password) {
        setError({ field: "password", message: "Incorrect password." });
        setLoading(false);
        return;
      }

      dispatch(setUser(user));
      navigate("/home");
    } catch (err) {
      setError({ message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: "email" | "password") =>
    `p-2 w-full rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white ${
      error.field === field ? "border-2 border-red-500" : "bg-white text-black"
    }`;

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Navbar />

      {/* Background and overlay */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[5px]"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="backdrop-blur-[8px] p-8 rounded-2xl shadow-2xl max-w-md w-full text-center mb-20 border border-white/20">
          <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>

          {error.message && !error.field && (
            <p className="text-red-500 text-sm mb-4">{error.message}</p>
          )}

          <div className="space-y-4 text-left">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass("email")}
              />
              {error.field === "email" && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass("password")}
              />
              {error.field === "password" && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-black text-white w-full py-2 rounded-lg hover:bg-green-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-gray-300 text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
