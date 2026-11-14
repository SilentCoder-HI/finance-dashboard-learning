import type { ReactNode } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/50 bg-white/40 p-6 shadow-lg shadow-blue-900/5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}
