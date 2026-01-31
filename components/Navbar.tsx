"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "block py-3 text-page-bg/90 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy rounded text-base font-medium transition-colors";

  return (
    <header className="border-b border-navy/20 bg-navy">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-semibold text-page-bg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy rounded"
        >
          Campbell Football Evaluations
        </Link>

        {/* Desktop: inline links */}
        <ul className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-page-bg/90 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy rounded text-sm font-medium transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: hamburger button */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden flex flex-col justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
        >
          <span
            className={`block h-0.5 w-6 bg-page-bg transition-transform origin-center ${
              open ? "rotate-45 translate-y-0.5" : "-translate-y-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-page-bg transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-page-bg transition-transform origin-center ${
              open ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Mobile: slide-out menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/50"
          aria-label="Close menu"
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-xs bg-navy shadow-xl transition-transform duration-200 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-16 px-6 pb-8">
            <ul className="space-y-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={linkClass}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
