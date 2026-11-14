export default function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-bold text-blue-700">{value}</div>
      <div className="mt-1 text-xs text-slate-400">Sample data</div>
    </div>
  );
}
