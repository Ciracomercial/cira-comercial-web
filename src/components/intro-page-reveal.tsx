"use client";

export function IntroPageReveal() {
  return <style jsx global>{`
    body > main, body > header, body > footer { animation: ciraPageReveal .55s 1.25s ease both; }
    @keyframes ciraPageReveal { from { opacity: .25; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (prefers-reduced-motion: reduce) { body > main, body > header, body > footer { animation: none; } }
  `}</style>;
}
