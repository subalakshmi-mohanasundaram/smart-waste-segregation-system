import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { FaRecycle, FaCalendarAlt } from "react-icons/fa";

function HouseholdDashboard() {
  const [wasteType, setWasteType] = useState("");
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");

  const [allPickups, setAllPickups] = useState([]);
  const [view, setView] = useState(""); // "history" | "scheduled"

  // 🔹 Fetch ALL pickups on page load
  useEffect(() => {
    fetchAllPickups();
  }, []);

  const fetchAllPickups = async () => {
    try {
      const res = await api.get("/pickups/my");
      setAllPickups(res.data);
    } catch (err) {
      console.error("Failed to load pickups");
    }
  };

  // 🔹 Create pickup
  const createPickup = async () => {
    try {
      await api.post("/pickups/request", {
        wasteType,
        scheduledDate: date,
      });

      setMsg("Pickup request created successfully ✅");
      setWasteType("");
      setDate("");
      fetchAllPickups(); // refresh list
    } catch (error) {
      setMsg("Error creating pickup ❌");
    }
  };

  // 🔹 Filter logic
  const displayedPickups =
    view === "scheduled"
      ? allPickups.filter((p) => p.status === "pending")
      : allPickups;

  return (
    <Layout>
      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          onClick={() => setView("history")}
          className="cursor-pointer"
        >
          <DashboardCard
            title="Pickup History"
            value="View All"
            icon={<FaRecycle />}
          />
        </div>

        <div
          onClick={() => setView("scheduled")}
          className="cursor-pointer"
        >
          <DashboardCard
            title="Scheduled Pickups"
            value="Pending Only"
            icon={<FaCalendarAlt />}
          />
        </div>
      </div>

      {/* REQUEST PICKUP */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
          Request New Pickup
        </h2>

        <select
          className="border p-2 w-full mb-3 rounded"
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
        >
          <option value="">Select Waste Type</option>
          <option value="plastic">Plastic</option>
          <option value="paper">Paper</option>
          <option value="metal">Metal</option>
          <option value="e-waste">E-Waste</option>
        </select>

        <input
          type="date"
          className="border p-2 w-full mb-3 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={createPickup}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded w-full font-semibold"
        >
          Request Pickup
        </button>

        {msg && (
          <p className="mt-3 text-center text-green-700 font-medium">
            {msg}
          </p>
        )}
      </div>

      {/* TABLE SECTION */}
      {view && (
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-green-700 capitalize">
            {view === "history"
              ? "Pickup History (All)"
              : "Scheduled Pickups (Pending)"}
          </h3>

          {displayedPickups.length === 0 ? (
            <p className="text-center text-gray-500">
              No pickups found
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border p-2">Waste</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedPickups.map((p) => (
                  <tr key={p._id} className="text-center">
                    <td className="border p-2 capitalize">
                      {p.wasteType}
                    </td>
                    <td className="border p-2">
                      {new Date(p.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="border p-2 capitalize">
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </Layout>
  );
}

export default HouseholdDashboard;
