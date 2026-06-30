"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { usePlinth } from "@/lib/store";
import Link from "next/link";

export default function Home() {
  const { listings } = usePlinth();
  const featuredListings = listings.filter((l) => l.featured && l.status === "available").slice(0, 6);
  const neighborhoods = Array.from(new Set(listings.map((l) => l.area)));

  return (
    <main>
      <Navbar />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-lagoon">
            Rental Listings — Lagos
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] text-paper sm:text-6xl">
            Every listing here,{" "}
            <span className="italic text-amber">walked through</span> before
            it's posted.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-sand/70">
            No stock photos, no recycled ads. Each property on Plinth is
            verified in person across {neighborhoods.length} Lagos
            neighborhoods, from Yaba to Ikoyi.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <Link
                key={n}
                href={`/listings?location=${encodeURIComponent(n)}`}
                className="rounded-sm border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-sand/60 transition hover:border-amber hover:text-amber"
              >
                {n}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-6">
          <h2 className="font-display text-2xl text-paper">
            Featured Listings
          </h2>
          <Link
            href="/listings"
            className="font-mono text-[11px] uppercase tracking-widest2 text-amber transition hover:text-paper"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
