import { Link } from "react-router-dom";
import { learningDays, phases } from "../data/learningData";

export default function LearningJourneyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Learning Journey</h1>
      <div className="space-y-2">
        <h2 className="font-semibold">Phases</h2>
        <div className="flex flex-wrap gap-2">
          {phases.map((p) => (
            <span key={p} className="rounded-full border bg-white px-3 py-1 text-xs">{p}</span>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {learningDays.map((day) => (
          <div key={day.day} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Day {day.day} · {day.phase}</div>
                <h3 className="font-semibold">{day.title}</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{day.status}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{day.task}</p>
            <Link to={`/dashboard/day/${day.day}`} className="mt-3 inline-block text-sm text-blue-600">View details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
