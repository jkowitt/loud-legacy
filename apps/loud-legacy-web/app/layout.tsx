import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loud Legacy - Build Louder",
  description:
    "Loud Legacy connects VALORA, VenueVR, Business Now, and DIY Mr Fix It into one unified ecosystem for builders, creators, and operators.",
  keywords: "real estate, events, coaching, tools, DIY, property management",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Loud Legacy - Build Louder",
    description: "Unified ecosystem of builder tools and platforms",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Minimal, explicit App Router root layout to satisfy CI detection.
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
