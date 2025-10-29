"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/project-library", label: "Project Library" },
  { href: "/toolbox", label: "Toolbox" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Video Tutorials" },
  { href: "/shop", label: "Shop" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" }
];

const Header = () => {
  const pathname = usePathname();

  const activeMap = useMemo(
    () => navLinks.reduce<Record<string, boolean>>((map, link) => {
      map[link.href] = pathname === link.href;
      return map;
    }, {}),
    [pathname]
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center" aria-label="DIY Mr. Fix It home">
          <Logo className="w-28 sm:w-32" />
        </Link>

        <nav className="hidden gap-4 text-sm font-semibold text-navy lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-2 transition ${
                activeMap[link.href] ? "bg-orange text-white" : "hover:bg-light-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/project-library"
          className="rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Browse Repairs
        </Link>
      </div>
    </header>
  );
};

export default Header;
