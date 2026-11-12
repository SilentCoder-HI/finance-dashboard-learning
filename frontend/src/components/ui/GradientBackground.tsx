import type { ReactNode } from "react";
interface GradientBackgroundProps {
  children: ReactNode;
}

export default function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <div className="gradient-bg">
      <div className="gradient-bg__content">{children}</div>
    </div>
  );
}
