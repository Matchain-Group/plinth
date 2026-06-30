export type ListingPurpose = "rent" | "sale" | "shortlet";
export type ListingCategory =
  | "apartment"
  | "duplex"
  | "bungalow"
  | "self-contain"
  | "office"
  | "shop"
  | "land";
export type ListingStatus = "pending" | "available" | "rented" | "sold";

export interface Listing {
  id: string;
  title: string;
  purpose: ListingPurpose;
  category: ListingCategory;
  bedrooms?: number;
  bathrooms?: number;
  priceNGN: number;
  priceUnit: "year" | "month" | "total";
  area: string; // e.g. "Lekki Phase 1"
  lga: string; // e.g. "Eti-Osa"
  state: string; // default "Lagos"
  description: string;
  amenities: string[];
  images: string[]; // data URLs from local upload, or seed Unsplash URLs
  agentId: string;
  status: ListingStatus;
  featured: boolean;
  views: number;
  createdAt: string; // ISO date
}

export type UserRole = "admin" | "agent";

export interface Agent {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  whatsapp: string; // digits only, intl format, no +
  photo: string; // data URL or seed avatar
  bio: string;
  verified: boolean;
  joinedAt: string;
}

export interface Inquiry {
  id: string;
  listingId: string;
  agentId: string;
  name: string;
  phone: string;
  message: string;
  channel: "whatsapp" | "form";
  status: "new" | "contacted" | "closed";
  createdAt: string;
}
