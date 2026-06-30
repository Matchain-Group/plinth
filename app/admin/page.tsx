"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import { usePlinth } from "@/lib/store";

export default function AdminPage() {
  const { listings, agents, inquiries } = usePlinth();

  const pendingListings = listings.filter((l) => l.status === "pending").length;
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl text-paper">Admin Dashboard</h1>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-widest2 text-amber transition hover:text-paper"
          >
            Back to Site →
          </Link>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Listings" value={listings.length} />
          <StatCard label="Pending Approvals" value={pendingListings} />
          <StatCard label="Total Agents" value={agents.length} />
          <StatCard label="Total Inquiries" value={inquiries.length} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-sm border border-white/10 bg-surface2 p-6">
            <h2 className="mb-4 font-display text-xl text-paper">Pending Approvals</h2>
            {pendingListings === 0 ? (
              <p className="font-mono text-sm text-sand/50">No pending listings</p>
            ) : (
              <div className="space-y-4">
                {listings
                  .filter((l) => l.status === "pending")
                  .slice(0, 5)
                  .map((listing) => (
                    <div
                      key={listing.id}
                      className="border-b border-white/10 pb-4 last:border-0"
                    >
                      <p className="font-display text-sm text-paper">{listing.title}</p>
                      <p className="font-mono text-xs text-sand/70">{listing.area}</p>
                      <Link
                        href={`/admin/listings`}
                        className="mt-2 inline-block font-mono text-[10px] uppercase text-amber transition hover:text-paper"
                      >
                        Review →
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="rounded-sm border border-white/10 bg-surface2 p-6">
            <h2 className="mb-4 font-display text-xl text-paper">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/listings"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                Manage All Listings
              </Link>
              <Link
                href="/admin/agents"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                Manage Agents
              </Link>
              <Link
                href="/admin/inquiries"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                View All Inquiries
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
