"use client";

import { useEffect, useState } from "react";

export function SiteIntro() {
  const [phase, setPhase] = useState<"wait" | "expand" | "fade" | "done">("wait");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    const t1 = window.setTimeout(() => setPhase("expand"), 900);
    const t2 = window.setTimeout(() => setPhase("fade"), 2200);
    const t3 = window.setTimeout(() => setPhase("done"), 2600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`cira-intro ${phase}`} aria-hidden="true">
      <span className="blue-dot" />
      <style jsx>{`
        .cira-intro {
          position: fixed;
          z-index: 99999;
          inset: 0;
          overflow: hidden;
          background: #fff;
          pointer-events: none;
        }
        .blue-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #384a9f;
          transform: translate(-50%, -50%) scale(1);
          will-change: transform;
        }
        .expand .blue-dot,
        .fade .blue-dot {
          transform: translate(-50%, -50%) scale(180);
          transition: transform 1.3s cubic-bezier(.65, 0, .25, 1);
        }
        .fade {
          opacity: 0;
          transition: opacity .4s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .cira-intro { display: none; }
        }
      `}</style>
    </div>
  );
}
