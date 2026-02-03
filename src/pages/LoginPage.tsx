/**
 * LoginPage — User login. Uses JSON Server at http://localhost:5000/users.
 * Start the API with: npm run server (or npm run dev:all).
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000";

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
      const res = await fetch(`${API_BASE}/users`);

      if (!res.ok) {
        setError({
          message: "Server error. Is the API running? Try: npm run server",
        });
        return;
      }

      const users = await res.json();
      const user = users.find((u: { email: string }) => u.email === email);

      if (!user) {
        setError({ field: "email", message: "Email not found." });
        return;
      }

      if (atob(user.password) !== password) {
        setError({ field: "password", message: "Incorrect password." });
        return;
      }

      dispatch(setUser(user));
      navigate("/home");
    } catch (err) {
      const msg =
        err instanceof TypeError && err.message === "Failed to fetch"
          ? "Cannot connect to server. Start it with: npm run server (or npm run dev:all)"
          : "Something went wrong. Please try again.";
      setError({ message: msg });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: "email" | "password") =>
    `p-2 w-full rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base ${
      error.field === field ? "border-2 border-red-500" : "bg-white text-black"
    }`;

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Navbar />

      {/* Background and overlay */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[5px]"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="backdrop-blur-[8px] p-6 sm:p-8 rounded-2xl shadow-2xl max-w-xs sm:max-w-sm w-full text-center border border-white/20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Login</h1>

          {error.message && !error.field && (
            <p className="text-red-500 text-xs sm:text-sm mb-4">{error.message}</p>
          )}

          <div className="space-y-3 sm:space-y-4 text-left">
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Email</label>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass("email")}
              />
              {error.field === "email" && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{error.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-1 text-sm">Password</label>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass("password")}
              />
              {error.field === "password" && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{error.message}</p>
              )}
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-black text-white w-full py-2 rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm mt-4 text-center">
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
