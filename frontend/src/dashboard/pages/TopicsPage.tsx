import { learningDays } from "../data/learningData";

export default function TopicsPage() {
  const topics = Array.from(new Set(learningDays.flatMap((d) => d.topics)));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Topics</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div key={topic} className="rounded-xl border bg-white p-4 text-sm">{topic}</div>
        ))}
      </div>
    </div>
  );
}
