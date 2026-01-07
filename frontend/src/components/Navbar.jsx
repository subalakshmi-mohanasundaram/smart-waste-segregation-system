function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">♻ Smart Recycling & Waste Segregation System</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
