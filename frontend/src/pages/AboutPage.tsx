export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About This Project</h1>
      <p className="max-w-3xl text-slate-600">
        This project is a learning journal built as a finance dashboard. Each day adds new concepts,
        from UI structure and state management to backend APIs and system design.
      </p>
      <h2 className="text-xl font-semibold">Goal</h2>
      <p className="max-w-3xl text-slate-600">
        Progress from fundamentals to advanced software architecture and production engineering.
      </p>
      <h2 className="text-xl font-semibold">Technologies</h2>
      <p className="text-slate-600">React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, Express, MongoDB.</p>
    </div>
  );
}
