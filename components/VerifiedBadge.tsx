export default function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-lagoon/20 px-2 py-1">
      <svg
        className="h-3 w-3 text-lagoon"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-mono text-[10px] uppercase tracking-widest2 text-lagoon">
        Verified
      </span>
    </span>
  );
}
