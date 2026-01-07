import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import {
  FaUsers,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaSignOutAlt
} from "react-icons/fa";

function AdminDashboard() {
  const [active, setActive] = useState("users");
  const [users, setUsers] = useState([]);
  const [pickups, setPickups] = useState([]);

  const totalUsers = users.length;
  const totalPickups = pickups.length;
  const completed = pickups.filter(p => p.status === "completed").length;
  const pending = pickups.filter(p => p.status === "pending").length;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const u = await api.get("/admin/users");
      const p = await api.get("/admin/pickups");
      setUsers(u.data);
      setPickups(p.data);
    } catch (err) {
      console.error("Admin fetch failed");
    }
  };

  const wasteStats = {
    plastic: pickups.filter(p => p.wasteType === "plastic").length,
    paper: pickups.filter(p => p.wasteType === "paper").length,
    metal: pickups.filter(p => p.wasteType === "metal").length,
    "e-waste": pickups.filter(p => p.wasteType === "e-waste").length
  };

  return (
    <Layout>
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Stat title="Total Users" value={totalUsers} icon={<FaUsers />} />
        <Stat title="Total Pickups" value={totalPickups} icon={<FaTruck />} />
        <Stat title="Completed" value={completed} icon={<FaCheckCircle />} />
        <Stat title="Pending" value={pending} icon={<FaClock />} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ActionBtn text="View All Users" onClick={() => setActive("users")} />
        <ActionBtn text="View All Pickups" onClick={() => setActive("pickups")} />
        <ActionBtn text="Reports & Analytics" onClick={() => setActive("reports")} />
      </div>

      {/* CONTENT */}
      {active === "users" && (
        <Section title="All Users">
          <Table
            headers={["Name", "Email", "Role"]}
            rows={users.map(u => [u.name, u.email, u.role])}
          />
        </Section>
      )}

      {active === "pickups" && (
        <Section title="All Pickups">
          <Table
            headers={["User", "Waste", "Status"]}
            rows={pickups.map(p => [
              p.household?.name || "-",
              p.wasteType,
              p.status
            ])}
          />
        </Section>
      )}

      {active === "reports" && (
        <Section title="Reports & Analytics">
          {Object.keys(wasteStats).map(key => (
            <div key={key} className="mb-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="capitalize">{key}</span>
                <span>{wasteStats[key]}</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div
                  className="bg-green-600 h-3 rounded"
                  style={{ width: `${wasteStats[key] * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </Section>
      )}
    </Layout>
  );
}

/* COMPONENTS */

const Stat = ({ title, value, icon }) => (
  <div className="bg-white rounded shadow p-4 flex items-center gap-4">
    <div className="text-green-600 text-2xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-green-700">{value}</p>
    </div>
  </div>
);

const ActionBtn = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
  >
    {text}
  </button>
);

const Section = ({ title, children }) => (
  <div className="bg-white shadow rounded p-6">
    <h2 className="text-xl font-bold text-green-700 mb-4">{title}</h2>
    {children}
  </div>
);

const Table = ({ headers, rows }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-green-100">
        {headers.map(h => (
          <th key={h} className="border p-2 text-left">{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i}>
          {r.map((c, j) => (
            <td key={j} className="border p-2">{c}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default AdminDashboard;
