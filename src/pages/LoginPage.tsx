import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/users?email=${form.email}`);
    const data = await res.json();

    if (data.length === 0) {
      alert("User not found!");
      return;
    }

    const user = data[0];
    const decrypted = atob(user.password);

    if (decrypted !== form.password) {
      alert("Incorrect password!");
      return;
    }

    dispatch(login({ email: user.email, name: user.name }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center text-sm">
          No account?{" "}
          <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
