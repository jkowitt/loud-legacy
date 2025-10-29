import "../styles/global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Legacy CRM by Loud Legacy",
  description:
    "Custom CRM for sponsorships, real estate, consulting, and every venture across the Loud Legacy ecosystem."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
