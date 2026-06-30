"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import VerifiedBadge from "@/components/VerifiedBadge";
import { usePlinth } from "@/lib/store";

export default function AgentProfilePage() {
  const params = useParams();
  const { listings, getAgentById } = usePlinth();
  const agent = getAgentById(params.id as string);
  const agentListings = agent
    ? listings.filter((l) => l.agentId === agent.id && l.status === "available")
    : [];

  if (!agent) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-display text-xl text-sand/70">Agent not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Agent Header */}
        <div className="mb-8 rounded-sm border border-white/10 bg-surface2 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={agent.photo}
                alt={agent.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl text-paper">{agent.name}</h1>
                {agent.verified && <VerifiedBadge />}
              </div>
              <p className="mt-2 font-mono text-sm text-sand/70">
                {agent.email}
              </p>
              <p className="mt-1 font-mono text-sm text-sand/70">
                {agent.phone}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-sand/80">{agent.bio}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
                Joined {new Date(agent.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Agent Listings */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-display text-2xl text-paper">
            Active Listings
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
            {agentListings.length} properties
          </span>
        </div>

        {agentListings.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-xl text-sand/70">
              No active listings
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
