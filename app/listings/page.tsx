"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { usePlinth } from "@/lib/store";
import { ListingPurpose, ListingCategory } from "@/lib/types";

function ListingsContent() {
  const searchParams = useSearchParams();
  const { listings } = usePlinth();
  
  const [purpose, setPurpose] = useState<ListingPurpose>(
    (searchParams.get("purpose") as ListingPurpose) || "rent"
  );
  const [category, setCategory] = useState<ListingCategory | "">(
    (searchParams.get("category") as ListingCategory) || ""
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState("newest");

  const filteredListings = useMemo(() => {
    return listings
      .filter((l) => l.status === "available")
      .filter((l) => !purpose || l.purpose === purpose)
      .filter((l) => !category || l.category === category)
      .filter((l) => !location || l.area.toLowerCase().includes(location.toLowerCase()))
      .filter((l) => !minPrice || l.priceNGN >= Number(minPrice))
      .filter((l) => !maxPrice || l.priceNGN <= Number(maxPrice))
      .sort((a, b) => {
        if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sort === "price-asc") return a.priceNGN - b.priceNGN;
        if (sort === "price-desc") return b.priceNGN - a.priceNGN;
        return 0;
      });
  }, [listings, purpose, category, location, minPrice, maxPrice, sort]);

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
                  Purpose
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as ListingPurpose)}
                  className="w-full rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-sm text-sand focus:border-amber focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                  <option value="shortlet">Shortlet</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ListingCategory)}
                  className="w-full rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-sm text-sand focus:border-amber focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="self-contain">Self-Contain</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Lekki"
                  className="w-full rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-sm text-sand focus:border-amber focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
                  Price Range (₦)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-1/2 rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-sm text-sand focus:border-amber focus:outline-none"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-1/2 rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-sm text-sand focus:border-amber focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <h1 className="font-display text-2xl text-paper">
                Listings
              </h1>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
                  {filteredListings.length} results
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-sm text-sand focus:border-amber focus:outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredListings.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-display text-xl text-sand/70">
                  No listings match your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ListingsFallback() {
  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="font-mono text-sm text-sand/50">Loading listings…</p>
      </div>
      <Footer />
    </main>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<ListingsFallback />}>
      <ListingsContent />
    </Suspense>
  );
}
