"use client";

import { useState } from "react";
import { usePlinth } from "@/lib/store";

interface InquiryFormProps {
  listingId: string;
  agentId: string;
  listingTitle: string;
}

export default function InquiryForm({ listingId, agentId, listingTitle }: InquiryFormProps) {
  const { addInquiry } = usePlinth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      listingId,
      agentId,
      ...formData,
      channel: "form",
      status: "new",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-sm border border-lagoon/30 bg-lagoon/10 p-6 text-center">
        <p className="font-display text-lg text-lagoon">Inquiry Sent!</p>
        <p className="mt-2 text-sm text-sand/70">
          The agent will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
          Your Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand focus:border-amber focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
          Phone Number
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand focus:border-amber focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-sand/70">
          Message
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={`I'm interested in ${listingTitle}...`}
          className="w-full rounded-sm border border-white/20 bg-surface px-4 py-3 font-mono text-sm text-sand focus:border-amber focus:outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-sm bg-amber px-6 py-3 font-mono text-sm uppercase tracking-widest2 text-ink transition hover:bg-amber/90"
      >
        Send Inquiry
      </button>
    </form>
  );
}
