export default function ProjectsPage() {
  const projects = [
    { name: "Finance Dashboard", desc: "React + TypeScript + Vite dashboard" },
    { name: "Auth API", desc: "Express + MongoDB authentication" },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl border bg-white p-4">
            <h2 className="font-semibold">{p.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
