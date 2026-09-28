"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function SiteIntro() {
  const [phase, setPhase] = useState<"dot" | "logo" | "move" | "done">("dot");
  const [target, setTarget] = useState({ x: 28, y: 28, size: 44 });
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    const measureTarget = () => {
      const logo = document.querySelector<HTMLElement>(".header-brand img");
      if (!logo) return;
      const rect = logo.getBoundingClientRect();
      setTarget({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, size: rect.width || 44 });
    };

    measureTarget();
    window.addEventListener("resize", measureTarget);
    document.documentElement.classList.add("intro-playing");

    timers.current = [
      window.setTimeout(() => setPhase("logo"), 620),
      window.setTimeout(() => { measureTarget(); setPhase("move"); }, 980),
      window.setTimeout(() => {
        setPhase("done");
        document.documentElement.classList.remove("intro-playing");
      }, 1800),
    ];

    return () => {
      timers.current.forEach(window.clearTimeout);
      window.removeEventListener("resize", measureTarget);
      document.documentElement.classList.remove("intro-playing");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`site-intro site-intro-${phase}`} aria-hidden="true">
      <div className="site-intro-stage">
        <span className="site-intro-dot" />
        <div
          className="site-intro-logo"
          style={phase === "move" ? {
            left: `${target.x}px`,
            top: `${target.y}px`,
            width: `${target.size}px`,
            height: `${target.size}px`,
          } : undefined}
        >
          <Image src="/assets/branding/cira-logo.png" alt="" fill sizes="160px" priority />
        </div>
      </div>
    </div>
  );
}
