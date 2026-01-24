import "../styles/global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Loud Works - Workforce & Applied Learning Platform",
  description:
    "Connect talent with real paid projects. Build proof of skills, earn references, and create measurable economic mobility.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
