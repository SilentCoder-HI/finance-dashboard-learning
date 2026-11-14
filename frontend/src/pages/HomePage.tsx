import { Link } from "react-router-dom";
import {
  Code2,
  Database,
  Cpu,
  Rocket,
  Layers,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const activity = [
  { day: "Day 7", topic: "Backend auth and MongoDB", desc: "Express API with bcrypt and Mongoose", status: "In progress" },
  { day: "Day 6", topic: "Tailwind and design polish", desc: "Glassmorphism dashboard and Tailwind v4", status: "Completed" },
  { day: "Day 5", topic: "Invoice filtering and login", desc: "Redux user state and filters", status: "Completed" },
];

const phases = [
  { n: "01", title: "Frontend Fundamentals", desc: "HTML, CSS, JavaScript, React basics." },
  { n: "02", title: "React & State Management", desc: "Hooks, Redux, routing, forms." },
  { n: "03", title: "Backend Development", desc: "Node.js, Express, REST APIs." },
  { n: "04", title: "Database Architecture", desc: "MongoDB, PostgreSQL, schema design." },
  { n: "05", title: "Authentication & Authorization", desc: "JWT, roles, protected routes." },
  { n: "06", title: "Advanced Frontend & Performance", desc: "Optimization, accessibility." },
  { n: "07", title: "System Design & Scalability", desc: "Caching, queues, distributed systems." },
  { n: "08", title: "Production & Deployment", desc: "Docker, CI/CD, monitoring." },
];

const techGroups = [
  { title: "Frontend", icon: Code2, items: ["React", "TypeScript", "Redux", "Tailwind CSS"] },
  { title: "Backend", icon: Layers, items: ["Node.js", "Express", "REST APIs"] },
  { title: "Databases", icon: Database, items: ["MongoDB", "PostgreSQL", "Redis"] },
  { title: "Architecture", icon: Cpu, items: ["Design patterns", "Caching", "Scalability"] },
  { title: "DevOps", icon: Rocket, items: ["Docker", "CI/CD", "Deployment"] },
];

const chartData = [
  { name: "D1", v: 1 },
  { name: "D2", v: 1 },
  { name: "D3", v: 1 },
  { name: "D4", v: 1 },
  { name: "D5", v: 1 },
  { name: "D6", v: 1 },
  { name: "D7", v: 0.6 },
];

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/40 to-blue-400/50" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-200/40 to-blue-400/50" />
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-blue-300/90 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue-500/50 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="text-lg font-bold">Finance Dashboard Learning</div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#home" className="text-sm text-slate-700 hover:text-slate-900">Home</a>
            <a href="#about" className="text-sm text-slate-700 hover:text-slate-900">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-lg border border-white/60 bg-white/40 px-3 py-1.5 text-sm font-medium hover:bg-white/60">
              Login
            </Link>
            <Link to="/dashboard" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-20 px-4 py-12">
        {/* Hero */}
        <section id="home" className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-white/60 bg-white/40 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              MY FULL-STACK LEARNING JOURNEY
            </span>
            <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
              From Building Interfaces to Designing Scalable Systems
            </h1>
            <p className="max-w-xl text-slate-600">
              This project documents my daily progress as I learn frontend development, backend architecture, databases, and advanced system design through practical implementation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#roadmap" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                Explore My Journey
              </a>
              <Link to="/dashboard" className="rounded-lg border border-white/60 bg-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/60">
                Open Dashboard
              </Link>
            </div>
          </div>
          <Glass>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Learning Progress</span>
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  ["Days", "7"],
                  ["Topics", "24"],
                  ["Progress", "42%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-white/50 p-3">
                    <div className="text-xs text-slate-500">{label}</div>
                    <div className="text-lg font-bold">{value}</div>
                  </div>
                ))}
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <Bar dataKey="v" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500">Sample data for demonstration.</p>
            </div>
          </Glass>
        </section>

        {/* Learning Progress */}
        <section className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Every Day, A Step Forward</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              I learn by building real features and improving them day by day.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Learning Days", "7"],
              ["Topics Explored", "24"],
              ["Projects Built", "3"],
              ["Current Phase", "Backend"],
            ].map(([label, value]) => (
              <Glass key={label}>
                <div className="text-sm text-slate-500">{label}</div>
                <div className="mt-2 text-3xl font-bold text-blue-700">{value}</div>
                <div className="mt-1 text-xs text-slate-400">Sample data</div>
              </Glass>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">The Journey Ahead</h2>
            <p className="text-slate-600">From fundamentals to advanced system design.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase) => (
              <Glass key={phase.n}>
                <div className="text-sm font-semibold text-blue-600">{phase.n}</div>
                <h3 className="mt-1 font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{phase.desc}</p>
              </Glass>
            ))}
          </div>
        </section>

        {/* What I'm learning */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">What I Am Learning</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((group) => {
              const Icon = group.icon;
              return (
                <Glass key={group.title}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">{group.title}</h3>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/60 bg-white/50 px-2.5 py-1 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </Glass>
              );
            })}
          </div>
        </section>

        {/* Daily approach */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Daily Learning Approach</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Learn a Concept", "Understand the theory and patterns."],
              ["Implement It", "Build a feature in the dashboard."],
              ["Understand the Architecture", "Reflect on design decisions."],
            ].map(([title, desc]) => (
              <Glass key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </Glass>
            ))}
          </div>
        </section>

        {/* Latest activity */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Latest Learning Activity</h2>
            <Link to="/dashboard/journey" className="flex items-center gap-1 text-sm font-medium text-blue-600">
              View All Learning Days <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {activity.map((item) => (
              <Glass key={item.day} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-blue-700">{item.day}</div>
                  <div className="font-medium">{item.topic}</div>
                  <div className="text-sm text-slate-600">{item.desc}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  {item.status}
                </div>
              </Glass>
            ))}
          </div>
          <p className="text-xs text-slate-500">Demo data for demonstration.</p>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <Glass className="space-y-4">
            <h2 className="text-3xl font-bold">Follow the Journey</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Explore the daily progress, concepts, projects, and technical decisions behind this learning journey.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/dashboard" className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                Explore Dashboard
              </Link>
              <Link to="/about" className="rounded-lg border border-white/60 bg-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/60">
                About This Project
              </Link>
            </div>
          </Glass>
        </section>
      </main>

      <footer className="border-t border-white/40 bg-white/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-600 md:flex-row">
          <div>Finance Dashboard Learning</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <Link to="/about" className="hover:text-slate-900">About</Link>
            <Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          </div>
          <div>© 2026 Learning Project</div>
        </div>
      </footer>
    </div>
  );
}
