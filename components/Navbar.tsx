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
    <header className="relative z-[60] vintage-texture border-b border-navy/20 bg-navy">
      <nav
        className="relative z-[55] mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6"
        aria-label="Main navigation"
      >
        {/* Left spacer: balances right links so logo stays centered */}
        <div className="hidden md:block md:flex-1" aria-hidden />

        {/* Logo: centered, on top, lowered slightly, with subtle texture */}
        <div className="vintage-texture absolute left-1/2 top-[63%] z-10 -translate-x-1/2 -translate-y-1/2 rounded">
          <Link
            href="/"
            className="flex focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy rounded"
            aria-label="Campbell Football Evaluations – Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Campbell Football Evaluations"
              className="h-[7.5rem] w-auto sm:h-[9rem] md:h-[10.5rem]"
            />
          </Link>
        </div>

        {/* Desktop: inline links – pushed right */}
        <ul className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-6 md:pl-12">
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

        {/* Panel: left side, narrow (background for text only) */}
        <div
          className={`absolute top-0 left-0 h-full w-[9rem] max-w-[40vw] bg-navy shadow-xl transition-transform duration-200 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-16 px-4 pb-8">
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
