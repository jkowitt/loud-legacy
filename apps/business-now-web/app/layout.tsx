import "../styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Now by Loud Legacy",
  description: "Courses, templates, and coaching for operators." 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
