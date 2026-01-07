import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function CollectorDashboard() {
  const [pickups, setPickups] = useState([]);
  const [weight, setWeight] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const fetchPendingPickups = async () => {
    const res = await api.get("/pickups/pending");
    setPickups(res.data);
  };

  const completePickup = async () => {
    await api.put(`/pickups/complete/${selectedId}`, { weight });
    setWeight("");
    setSelectedId("");
    fetchPendingPickups();
  };

  useEffect(() => {
    fetchPendingPickups();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Collector Dashboard
      </h2>

      {pickups.length === 0 ? (
        <p className="text-gray-500">No pending pickups</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Waste</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((p) => (
              <tr key={p._id} className="text-center border-t">
                <td className="p-2">{p.user?.name}</td>
                <td className="p-2 capitalize">{p.wasteType}</td>
                <td className="p-2">
                  {new Date(p.scheduledDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => setSelectedId(p._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedId && (
        <div className="mt-6 bg-white p-4 shadow rounded max-w-sm">
          <h3 className="font-semibold mb-2">Enter Collected Weight (kg)</h3>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-2 w-full mb-3"
          />
          <button
            onClick={completePickup}
            className="bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Confirm Pickup
          </button>
        </div>
      )}
    </Layout>
  );
}

export default CollectorDashboard;
