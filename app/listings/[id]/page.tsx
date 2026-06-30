"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatusBadge from "@/components/StatusBadge";
import VerifiedBadge from "@/components/VerifiedBadge";
import WhatsAppButton from "@/components/WhatsAppButton";
import InquiryForm from "@/components/InquiryForm";
import { usePlinth } from "@/lib/store";

function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ListingDetailPage() {
  const params = useParams();
  const { listings, getAgentById, incrementListingViews } = usePlinth();
  const listing = listings.find((l) => l.id === params.id);
  const agent = listing ? getAgentById(listing.agentId) : undefined;

  useEffect(() => {
    if (listing) {
      incrementListingViews(listing.id);
    }
  }, [listing, incrementListingViews]);

  if (!listing || !agent) {
    return (
      <main>
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-display text-xl text-sand/70">Listing not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Image Gallery */}
        <div className="mb-8 aspect-[16/9] overflow-hidden rounded-sm border border-white/10">
          <Image
            src={listing.images[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop"}
            alt={listing.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <StatusBadge status={listing.status} />
                <h1 className="mt-3 font-display text-3xl text-paper">{listing.title}</h1>
                <p className="mt-2 font-mono text-sm text-sand/70">
                  {listing.area}, {listing.lga}, {listing.state}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 border-b border-white/10 pb-6">
              <p className="font-display text-3xl text-amber">
                {formatNaira(listing.priceNGN)}
                <span className="text-lg text-sand/50"> / {listing.priceUnit}</span>
              </p>
            </div>

            {/* Specs */}
            <div className="mb-6 flex flex-wrap gap-4 border-b border-white/10 pb-6">
              {listing.bedrooms !== undefined && (
                <div className="rounded-sm bg-surface2 px-4 py-3">
                  <p className="font-display text-xl text-paper">{listing.bedrooms}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-sand/50">Bedrooms</p>
                </div>
              )}
              {listing.bathrooms !== undefined && (
                <div className="rounded-sm bg-surface2 px-4 py-3">
                  <p className="font-display text-xl text-paper">{listing.bathrooms}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-sand/50">Bathrooms</p>
                </div>
              )}
              <div className="rounded-sm bg-surface2 px-4 py-3">
                <p className="font-display text-xl capitalize text-paper">{listing.category}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-sand/50">Type</p>
              </div>
              <div className="rounded-sm bg-surface2 px-4 py-3">
                <p className="font-display text-xl capitalize text-paper">{listing.purpose}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-sand/50">Purpose</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 font-display text-xl text-paper">Description</h2>
              <p className="text-sm leading-relaxed text-sand/80">{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-3 font-display text-xl text-paper">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-sm border border-white/20 bg-surface px-3 py-2 font-mono text-xs text-sand"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Agent Card */}
              <div className="rounded-sm border border-white/10 bg-surface2 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg text-paper">{agent.name}</h3>
                      {agent.verified && <VerifiedBadge />}
                    </div>
                    <p className="font-mono text-[11px] text-sand/50">Agent</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <WhatsAppButton
                    phone={agent.whatsapp}
                    message={`Hi, I'm interested in "${listing.title}"`}
                  />
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="rounded-sm border border-white/10 bg-surface2 p-6">
                <h3 className="mb-4 font-display text-lg text-paper">Send Inquiry</h3>
                <InquiryForm
                  listingId={listing.id}
                  agentId={agent.id}
                  listingTitle={listing.title}
                />
              </div>

              {/* Stats */}
              <div className="rounded-sm border border-white/10 bg-surface2 p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
                  {listing.views} views
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-sand/50">
                  Listed {new Date(listing.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
