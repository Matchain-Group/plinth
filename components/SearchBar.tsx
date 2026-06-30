"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("rent");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (purpose) params.set("purpose", purpose);
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
      <select
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        className="rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand focus:border-amber focus:outline-none"
      >
        <option value="rent">For Rent</option>
        <option value="sale">For Sale</option>
        <option value="shortlet">Shortlet</option>
      </select>
      <input
        type="text"
        placeholder="Location (e.g., Lekki, Ikeja)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 min-w-[200px] rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand placeholder:text-sand/40 focus:border-amber focus:outline-none"
      />
      <input
        type="number"
        placeholder="Min Price (₦)"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-32 rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand placeholder:text-sand/40 focus:border-amber focus:outline-none"
      />
      <input
        type="number"
        placeholder="Max Price (₦)"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-32 rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand placeholder:text-sand/40 focus:border-amber focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-sm bg-amber px-6 py-3 font-mono text-sm uppercase tracking-widest2 text-ink transition hover:bg-amber/90"
      >
        Search
      </button>
    </form>
  );
}
