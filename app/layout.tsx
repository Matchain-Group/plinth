import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PlinthProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plinth — Lagos Rentals",
  description: "Verified rental listings across Lagos. Browse, compare, enquire on WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body bg-ink text-sand antialiased">
        <AuthProvider>
          <PlinthProvider>{children}</PlinthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
