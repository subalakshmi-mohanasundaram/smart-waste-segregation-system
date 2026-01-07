import { useState } from "react";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "household") {
        window.location.href = "/household";
      } else if (res.data.role === "collector") {
        window.location.href = "/collector";
      } else {
        window.location.href = "/admin";
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          ♻ Smart Recycling
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to manage waste responsibly
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
  Don’t have an account?{" "}
  <a
    href="/register"
    className="text-green-600 font-semibold hover:underline"
  >
    Create account
  </a>
</p>

        <p className="text-center text-gray-400 text-sm mt-6">
          © 2026 Smart Recycling System
        </p>
      </div>
    </div>
  );
}

export default Login;
