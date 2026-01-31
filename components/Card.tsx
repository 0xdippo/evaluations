export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-navy/15 bg-card-bg p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
