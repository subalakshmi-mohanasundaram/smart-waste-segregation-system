import { useState } from "react";
import api from "../api/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    houseNumber: "",
    street: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/auth/register", form);
      setMsg("Registration successful. Please login.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setMsg("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          ♻ Smart Recycling
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create your household account
        </p>

        {msg && (
          <p className="text-center text-green-600 mb-4">{msg}</p>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            className="border p-2 rounded col-span-2"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 rounded col-span-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 rounded col-span-2"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="houseNumber"
            placeholder="House No"
            className="border p-2 rounded"
            value={form.houseNumber}
            onChange={handleChange}
            required
          />

          <input
            name="street"
            placeholder="Street"
            className="border p-2 rounded"
            value={form.street}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/" className="text-green-600 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;
