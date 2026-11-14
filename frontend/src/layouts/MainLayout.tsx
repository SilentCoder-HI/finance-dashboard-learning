import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold text-slate-900">Finance Learning</Link>
          <nav className="flex items-center gap-3">
            <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
            <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
            <Link to="/login" className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-slate-50">Login</Link>
            <Link to="/dashboard" className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
          Finance Dashboard Learning Project
        </div>
      </footer>
    </div>
  );
}
