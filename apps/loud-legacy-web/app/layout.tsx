import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Legacy RE - Smart Property Analysis | Built to Last",
  description:
    "Analyze any property in minutes with AI. Get valuations, comparable sales, financial projections, and improvement plans. Legacy RE. Built to Last.",
  keywords: "real estate underwriting, property valuation, AI real estate, commercial real estate, deal analysis, portfolio management, comparable sales, cap rate analysis",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Legacy RE. Built to Last.",
    description: "Analyze any property in minutes. AI-powered valuations, real comps, and financial projections for brokers, investors, and lenders.",
    type: "website",
    siteName: "Legacy RE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy RE. Built to Last.",
    description: "Analyze any property in minutes. AI-powered valuations, comps, and financial projections.",
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
