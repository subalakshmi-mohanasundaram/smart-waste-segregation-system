import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">
        Smart Waste Segregation System
      </h1>

      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-white text-green-700 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="border border-white px-4 py-2 rounded hover:bg-white hover:text-green-700 transition"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
