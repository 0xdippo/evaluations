export function Footer() {
  return (
    <footer className="border-t border-navy/15 bg-navy mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-center">
        <p className="font-bold text-page-bg">Campbell Football Evaluations</p>
        <p className="mt-2 text-sm text-page-bg/90">
          Email:{" "}
          <a
            href="mailto:campbellfootballevaluations@gmail.com"
            className="text-gold underline hover:text-gold-hover focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy rounded transition-colors"
          >
            campbellfootballevaluations@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
