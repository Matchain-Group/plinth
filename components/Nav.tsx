import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="focus-ring rounded-sm">
          <span className="font-display text-2xl italic tracking-tight text-paper">
            Plinth
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <span className="hidden font-mono text-[11px] uppercase tracking-widest2 text-sand/50 sm:block">
            Lagos, Nigeria
          </span>
          <a
            href="#listings"
            className="focus-ring rounded-sm font-mono text-[11px] uppercase tracking-widest2 text-amber transition hover:text-paper"
          >
            View Listings
          </a>
        </nav>
      </div>
    </header>
  );
}
