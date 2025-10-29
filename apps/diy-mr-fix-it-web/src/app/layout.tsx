import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Mr. Fix It | DIY Home Repair Hub",
  description:
    "Learn how to fix common home issues, build your toolbox, and become a confident DIYer with Mr. Fix It's tutorials, tool guides, and expert tips."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
    <body className="bg-light-gray">
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
