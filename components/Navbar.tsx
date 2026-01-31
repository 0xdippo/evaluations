import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
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
        <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
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
      </nav>
    </header>
  );
}
