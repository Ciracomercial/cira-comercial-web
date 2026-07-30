"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article className={isOpen ? "faq-item is-open" : "faq-item"} key={item.question}>
            <button id={`faq-question-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span>{item.question}</span><span className="faq-symbol" aria-hidden="true">+</span>
            </button>
            <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}><p>{item.answer}</p></div>
          </article>
        );
      })}
    </div>
  );
}
