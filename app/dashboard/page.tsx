"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/lib/auth";
import { usePlinth } from "@/lib/store";

export default function DashboardPage() {
  const { session } = useAuth();
  const { listings, inquiries } = usePlinth();

  const myListings = listings.filter((l) => l.agentId === session?.agentId);
  const myInquiries = inquiries.filter((i) => i.agentId === session?.agentId);
  const totalViews = myListings.reduce((sum, l) => sum + l.views, 0);
  const newInquiries = myInquiries.filter((i) => i.status === "new").length;

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl text-paper">Agent Dashboard</h1>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-widest2 text-amber transition hover:text-paper"
          >
            Back to Site →
          </Link>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active Listings" value={myListings.length} />
          <StatCard label="Total Views" value={totalViews} />
          <StatCard label="New Inquiries" value={newInquiries} />
          <StatCard label="Total Inquiries" value={myInquiries.length} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-sm border border-white/10 bg-surface2 p-6">
            <h2 className="mb-4 font-display text-xl text-paper">Recent Inquiries</h2>
            {myInquiries.length === 0 ? (
              <p className="font-mono text-sm text-sand/50">No inquiries yet</p>
            ) : (
              <div className="space-y-4">
                {myInquiries.slice(0, 5).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="border-b border-white/10 pb-4 last:border-0"
                  >
                    <p className="font-display text-sm text-paper">{inquiry.name}</p>
                    <p className="font-mono text-xs text-sand/70">{inquiry.phone}</p>
                    <p className="mt-1 text-xs text-sand/60">{inquiry.message}</p>
                    <span className="mt-2 inline-block rounded-full bg-amber/20 px-2 py-1 font-mono text-[10px] uppercase text-amber">
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-sm border border-white/10 bg-surface2 p-6">
            <h2 className="mb-4 font-display text-xl text-paper">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/dashboard/listings/new"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                Add New Listing
              </Link>
              <Link
                href="/dashboard/listings"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                Manage Listings
              </Link>
              <Link
                href="/dashboard/inquiries"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                View All Inquiries
              </Link>
              <Link
                href="/dashboard/profile"
                className="block rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand transition hover:border-amber hover:text-amber"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
