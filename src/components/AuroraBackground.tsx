"use client";

export default function AuroraBackground({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`aurora-bg fixed inset-0 -z-10 ${className}`}>
      {children}
    </div>
  );
}
