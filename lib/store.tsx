"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Listing, Agent, Inquiry } from "./types";
import { seedAgents, seedListings, seedInquiries } from "./seed-data";

interface PlinthContextType {
  listings: Listing[];
  agents: Agent[];
  inquiries: Inquiry[];
  addListing: (listing: Omit<Listing, "id" | "views" | "createdAt">) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt">) => void;
  updateInquiry: (id: string, updates: Partial<Inquiry>) => void;
  getAgentById: (id: string) => Agent | undefined;
  getAgentByEmail: (email: string) => Agent | undefined;
  incrementListingViews: (id: string) => void;
}

const PlinthContext = createContext<PlinthContextType | undefined>(undefined);

export function PlinthProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage or seed on mount
  useEffect(() => {
    const loadState = () => {
      try {
        const savedListings = localStorage.getItem("plinth_listings");
        const savedAgents = localStorage.getItem("plinth_agents");
        const savedInquiries = localStorage.getItem("plinth_inquiries");

        setListings(savedListings ? JSON.parse(savedListings) : seedListings);
        setAgents(savedAgents ? JSON.parse(savedAgents) : seedAgents);
        setInquiries(savedInquiries ? JSON.parse(savedInquiries) : seedInquiries);

        // Save seed data if localStorage was empty
        if (!savedListings) {
          try {
            localStorage.setItem("plinth_listings", JSON.stringify(seedListings));
          } catch (e) {
            console.warn("Could not save listings to localStorage:", e);
          }
        }
        if (!savedAgents) {
          try {
            localStorage.setItem("plinth_agents", JSON.stringify(seedAgents));
          } catch (e) {
            console.warn("Could not save agents to localStorage:", e);
          }
        }
        if (!savedInquiries) {
          try {
            localStorage.setItem("plinth_inquiries", JSON.stringify(seedInquiries));
          } catch (e) {
            console.warn("Could not save inquiries to localStorage:", e);
          }
        }
      } catch (e) {
        console.error("Error loading from localStorage:", e);
        // Fallback to seed data on error
        setListings(seedListings);
        setAgents(seedAgents);
        setInquiries(seedInquiries);
      }
      setIsInitialized(true);
    };

    loadState();
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem("plinth_listings", JSON.stringify(listings));
    } catch (e) {
      console.warn("Could not save listings to localStorage (quota exceeded?):", e);
    }
  }, [listings, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem("plinth_agents", JSON.stringify(agents));
    } catch (e) {
      console.warn("Could not save agents to localStorage (quota exceeded?):", e);
    }
  }, [agents, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem("plinth_inquiries", JSON.stringify(inquiries));
    } catch (e) {
      console.warn("Could not save inquiries to localStorage (quota exceeded?):", e);
    }
  }, [inquiries, isInitialized]);

  const addListing = (listing: Omit<Listing, "id" | "views" | "createdAt">) => {
    const newListing: Listing = {
      ...listing,
      id: `listing-${Date.now()}`,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    setListings((prev: Listing[]) => [...prev, newListing]);
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings((prev: Listing[]) =>
      prev.map((listing: Listing) => (listing.id === id ? { ...listing, ...updates } : listing))
    );
  };

  const deleteListing = (id: string) => {
    setListings((prev: Listing[]) => prev.filter((listing: Listing) => listing.id !== id));
  };

  const addInquiry = (inquiry: Omit<Inquiry, "id" | "createdAt">) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inquiry-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev: Inquiry[]) => [...prev, newInquiry]);
  };

  const updateInquiry = (id: string, updates: Partial<Inquiry>) => {
    setInquiries((prev: Inquiry[]) =>
      prev.map((inquiry: Inquiry) => (inquiry.id === id ? { ...inquiry, ...updates } : inquiry))
    );
  };

  const getAgentById = (id: string) => {
    return agents.find((agent: Agent) => agent.id === id);
  };

  const getAgentByEmail = (email: string) => {
    return agents.find((agent: Agent) => agent.email === email);
  };

  const incrementListingViews = (id: string) => {
    setListings((prev: Listing[]) =>
      prev.map((listing: Listing) =>
        listing.id === id ? { ...listing, views: listing.views + 1 } : listing
      )
    );
  };

  return (
    <PlinthContext.Provider
      value={{
        listings,
        agents,
        inquiries,
        addListing,
        updateListing,
        deleteListing,
        addInquiry,
        updateInquiry,
        getAgentById,
        getAgentByEmail,
        incrementListingViews,
      }}
    >
      {children}
    </PlinthContext.Provider>
  );
}

export function usePlinth() {
  const context = useContext(PlinthContext);
  if (context === undefined) {
    throw new Error("usePlinth must be used within a PlinthProvider");
  }
  return context;
}
