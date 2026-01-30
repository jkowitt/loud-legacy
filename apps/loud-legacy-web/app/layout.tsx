import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Legacy RE - Real Estate Intelligence Platform | Built to Last",
  description:
    "AI-powered real estate intelligence platform. Valuations, underwriting, and portfolio management in one system. Legacy RE. Built to Last.",
  keywords: "real estate underwriting, property valuation, AI real estate, commercial real estate, deal analysis, portfolio management, comparable sales, cap rate analysis",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Legacy RE. Built to Last.",
    description: "AI-powered real estate intelligence platform combining valuations, underwriting, and portfolio management. Built for brokers, investors, and lenders.",
    type: "website",
    siteName: "Legacy RE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy RE. Built to Last.",
    description: "AI-powered real estate intelligence. Valuations, underwriting, and portfolio management in one platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
