export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="font-display text-lg italic text-paper">
            Plinth
          </span>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-sand/40">
            Lagos, Nigeria — Demo portfolio build
          </p>
        </div>
      </div>
    </footer>
  );
}
