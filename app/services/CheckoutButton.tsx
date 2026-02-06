"use client";

import { useState } from "react";

const buttonClass =
  "inline-flex items-center justify-center rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-page-bg hover:bg-navy-hover focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-colors disabled:opacity-50";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Checkout failed");
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("No redirect URL received");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={buttonClass}
      >
        {loading ? "Redirecting…" : "Get Started (Purchase)"}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
