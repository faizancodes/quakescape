export function MapSkeleton() {
  return <div className="h-[420px] animate-pulse border border-border-default bg-surface-level1" />;
}

export function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-20 animate-pulse border border-border-default bg-surface-level1" />
      ))}
    </div>
  );
}
