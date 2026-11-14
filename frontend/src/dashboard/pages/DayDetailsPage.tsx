import { useParams, Link } from "react-router-dom";
import { learningDays } from "../data/learningData";

export default function DayDetailsPage() {
  const { day } = useParams();
  const found = learningDays.find((d) => d.day === Number(day));

  if (!found) {
    return <div className="rounded-xl border bg-white p-6">Day not found.</div>;
  }

  return (
    <div className="space-y-4">
      <Link to="/dashboard/journey" className="text-sm text-blue-600">Back to journey</Link>
      <h1 className="text-2xl font-bold">Day {found.day}: {found.title}</h1>
      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Objectives</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          {found.objectives.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Topics</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {found.topics.map((t) => <span key={t} className="rounded-full border px-2 py-1 text-xs">{t}</span>)}
        </div>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold">Practical Task</h2>
        <p className="mt-2 text-sm text-slate-600">{found.task}</p>
      </div>
    </div>
  );
}
