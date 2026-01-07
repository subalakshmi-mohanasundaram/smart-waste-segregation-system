function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
      <div className="text-green-600 text-3xl">
        {icon}
      </div>

      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;
