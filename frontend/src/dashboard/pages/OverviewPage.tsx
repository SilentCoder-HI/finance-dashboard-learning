import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useAppSelector } from "../../store";

const chartData = [
  { name: "Companies", value: 2 },
  { name: "Users", value: 12 },
  { name: "Super", value: 1 },
];

export default function OverviewPage() {

  const user = useAppSelector((state)=> state.auth.user)
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="rounded-full w-15 h-15 overflow-hidden">
          <div className="bg-white w-full h-full flex items-center justify-center ">
              {user?.name.trim().charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl">
          <div className="text-sm text-slate-500">Companies</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">2</div>
          <div className="mt-1 text-xs text-slate-400">Sample data</div>
        </div>
        <div className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl">
          <div className="text-sm text-slate-500">Users</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">12</div>
          <div className="mt-1 text-xs text-slate-400">Sample data</div>
        </div>
        <div className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl">
          <div className="text-sm text-slate-500">Super User</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">1</div>
          <div className="mt-1 text-xs text-slate-400">Sample data</div>
        </div>
      </div>
      <div className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl">
        <h2 className="mb-3 font-semibold">Summary</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
