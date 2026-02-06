"use client";

import { useEffect, useState } from "react";
const RELOAD_KEY = "get-started-session-reload";

export function PaymentRequiredFallback() {
  const [shouldShowHelp, setShouldShowHelp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    const alreadyReloaded = sessionStorage.getItem(RELOAD_KEY);
    if (!alreadyReloaded) {
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
      return;
    }
    setShouldShowHelp(true);
  }, []);

  if (!shouldShowHelp) return null;

  return (
    <p className="mt-4 text-sm text-amber-800 bg-amber-50 rounded p-3 text-left max-w-md mx-auto">
      You have <code className="bg-amber-100 px-1 rounded">session_id</code> in
      the URL but the server didn’t receive it. In Stripe Dashboard → your
      Payment Link → edit → <strong>After payment</strong>, set the URL to
      exactly:{" "}
      <code className="block mt-1 bg-amber-100 p-2 rounded text-xs break-all">
        http://localhost:3000/get-started?session_id={"{"}CHECKOUT_SESSION_ID{"}"}
      </code>
    </p>
  );
}
