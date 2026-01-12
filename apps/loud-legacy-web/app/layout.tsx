import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Loud Legacy - Systems-Driven Business Software",
  description:
    "Loud Legacy builds intelligent operational systems. VALORA for real estate intelligence, Sportify for live event execution, Business Now for structured operations, and Legacy CRM for relationship discipline.",
  keywords: "real estate valuation, event management, business operations, CRM, underwriting, sports events, relationship management, operational systems",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Loud Legacy - Operational Excellence Through Intelligent Systems",
    description: "Four products solving real operational problems. Built for professionals who value structure, discipline, and long-term leverage.",
    type: "website",
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
