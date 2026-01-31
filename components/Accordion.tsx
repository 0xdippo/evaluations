"use client";

import { useState } from "react";

type Item = { id: string; question: string; answer: React.ReactNode };

export function Accordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-navy/10 border border-navy/15 rounded-lg overflow-hidden bg-card-bg">
      {items.map(({ id, question, answer }) => {
        const isOpen = openId === id;
        return (
          <div key={id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${id}`}
              id={`accordion-heading-${id}`}
              className="flex w-full items-center justify-between px-4 py-4 text-left text-navy font-medium hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold"
            >
              {question}
              <span
                className={`ml-2 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                ▼
              </span>
            </button>
            <div
              id={`accordion-${id}`}
              role="region"
              aria-labelledby={`accordion-heading-${id}`}
              hidden={!isOpen}
              className="px-4 pb-4 pt-0 text-text-muted text-sm"
            >
              {answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
