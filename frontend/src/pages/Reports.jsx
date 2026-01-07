import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  LineChart, Line,
  CartesianGrid, Legend
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444"];

function Reports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    api.get("/admin/reports")
      .then(res => setReports(res.data))
      .catch(() => alert("Failed to load reports"));
  }, []);

  if (!reports) {
    return <p className="text-center mt-6">Loading Reports...</p>;
  }

  return (
    <div className="space-y-10 mt-8">

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-green-700 font-bold mb-4">
          Pickups by Waste Type
        </h2>

        <BarChart width={600} height={300} data={reports.wasteStats}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#22c55e" />
        </BarChart>
      </div>

      {/* PIE CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-green-700 font-bold mb-4">
          Pickup Status
        </h2>

        <PieChart width={400} height={300}>
          <Pie
            data={reports.statusStats}
            dataKey="total"
            nameKey="_id"
            outerRadius={100}
          >
            {reports.statusStats.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* LINE CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-green-700 font-bold mb-4">
          Monthly Pickup Trend
        </h2>

        <LineChart width={700} height={300} data={reports.monthlyStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#22c55e" />
        </LineChart>
      </div>

    </div>
  );
}

export default Reports;
