import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP NAVBAR */}
      <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">♻ Smart Recycling & Waste Segregation System</h1>

        <button
          onClick={logout}
          className="bg-white text-green-700 px-4 py-1 rounded font-semibold hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div className="p-6">{children}</div>
    </div>
  );
}

export default Layout;
