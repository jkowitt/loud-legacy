import type { ReactNode } from "react";
import "../styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loud Legacy",
  description:
    "Loud Legacy connects the VALORA platform, VenueVR experiences, Business Now growth tools, Sportify event execution, and Legacy CRM into one ecosystem of builders.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
