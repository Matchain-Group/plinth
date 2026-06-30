import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/lib/types";

function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const isUnavailable = listing.status === "rented" || listing.status === "sold";

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="focus-ring group block overflow-hidden rounded-sm border border-white/10 bg-surface transition hover:border-amber/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.images[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition duration-700 group-hover:scale-105 ${
            isUnavailable ? "grayscale" : ""
          }`}
        />
        <div className="absolute left-0 top-0 bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-amber">
            {listing.area}
          </span>
        </div>
        {listing.featured && (
          <div className="absolute right-0 top-0 bg-amber/90 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-ink">
              Featured
            </span>
          </div>
        )}
        {isUnavailable && (
          <div className="absolute right-0 top-0 bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-sand/70">
              {listing.status}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg text-paper">{listing.title}</h3>
        <p className="mt-1 font-mono text-sm text-amber">
          {formatNaira(listing.priceNGN)}
          <span className="text-sand/50"> / {listing.priceUnit}</span>
        </p>

        <div className="mt-4 flex items-center gap-px border-t border-white/10 pt-3 font-mono text-[11px] text-sand/70">
          {listing.bedrooms !== undefined && (
            <span className="pr-3">
              {listing.bedrooms} <span className="text-sand/40">bed</span>
            </span>
          )}
          {listing.bathrooms !== undefined && (
            <span className="border-l border-white/10 px-3">
              {listing.bathrooms} <span className="text-sand/40">bath</span>
            </span>
          )}
          <span className="border-l border-white/10 pl-3">
            {listing.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
