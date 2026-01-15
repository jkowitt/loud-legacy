import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Loud Legacy - Software for People Who Run Things",
  description:
    "One account, five connected tools. VALORA for real estate deals. Sportify for game days. Business Now for operations. Legacy CRM for relationships. Built by operators, for operators.",
  keywords: "real estate underwriting, sports event management, business operations software, CRM, deal analysis, athletic department software, consulting tools",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Loud Legacy - Your Business Runs on Too Many Apps",
    description: "Stop duct-taping your business together. VALORA, Sportify, Business Now, and Legacy CRM—all connected, all yours.",
    type: "website",
    siteName: "Loud Legacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loud Legacy - Software for Operators",
    description: "One account, five connected tools. Built by operators, for operators.",
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
