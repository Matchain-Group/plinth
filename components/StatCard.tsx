export default function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-sm border border-white/10 bg-surface2 p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-amber">{value}</p>
    </div>
  );
}
