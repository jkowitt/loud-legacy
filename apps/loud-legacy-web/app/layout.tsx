import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Rally - Fan Engagement & Loyalty Platform | Van Wagner",
  description:
    "The gameday experience platform built for collegiate athletics. Check-ins, predictions, trivia, rewards, and real-time engagement for 353+ NCAA D1 schools.",
  keywords: "fan engagement, loyalty platform, collegiate athletics, NCAA, gameday, check-in, trivia, rewards, Van Wagner",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Rally - Fan Engagement & Loyalty Platform",
    description: "The gameday experience platform built for collegiate athletics. 353+ NCAA D1 schools.",
    type: "website",
    siteName: "Rally",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rally - Fan Engagement & Loyalty Platform",
    description: "The gameday experience platform built for collegiate athletics.",
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
