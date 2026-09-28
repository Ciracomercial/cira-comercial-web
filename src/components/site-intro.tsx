"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteIntro() {
  const [phase, setPhase] = useState<"dot" | "reveal" | "move" | "done">("dot");
  const [target, setTarget] = useState({ x: 44, y: 40, size: 48 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase("done"); return; }
    const measure = () => {
      const logo = document.querySelector<HTMLElement>(".header-brand img");
      if (!logo) return;
      const r = logo.getBoundingClientRect();
      setTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2, size: r.width || 48 });
    };
    measure();
    const t1 = window.setTimeout(() => setPhase("reveal"), 650);
    const t2 = window.setTimeout(() => { measure(); setPhase("move"); }, 1450);
    const t3 = window.setTimeout(() => setPhase("done"), 3000);
    window.addEventListener("resize", measure);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.clearTimeout(t3); window.removeEventListener("resize", measure); };
  }, []);

  if (phase === "done") return null;
  const moving = phase === "move";

  return <div className={`cira-intro ${phase}`} aria-hidden="true">
    <span className="blue-dot" />
    <div className="intro-logo" style={moving ? { left: target.x, top: target.y, width: target.size, height: target.size } : undefined}>
      <Image src="/assets/branding/cira-logo.png" alt="" fill sizes="150px" priority />
    </div>
    <style jsx>{`
      .cira-intro{position:fixed;z-index:99999;inset:0;background:#fff;overflow:hidden;pointer-events:none;transition:background .55s ease,opacity .3s ease}
      .blue-dot{position:absolute;left:50%;top:50%;width:12px;height:12px;border-radius:50%;background:#384a9f;transform:translate(-50%,-50%) scale(0);animation:dotIn .65s cubic-bezier(.2,.8,.2,1) forwards}
      .intro-logo{position:absolute;left:50%;top:50%;width:150px;height:150px;transform:translate(-50%,-50%) scale(.25);opacity:0;filter:drop-shadow(0 10px 22px rgba(36,50,113,.15));transition:left 1.35s cubic-bezier(.16,.72,.18,1),top 1.35s cubic-bezier(.16,.72,.18,1),width 1.35s cubic-bezier(.16,.72,.18,1),height 1.35s cubic-bezier(.16,.72,.18,1),transform .75s cubic-bezier(.2,.8,.2,1),opacity .35s ease}
      .reveal .blue-dot,.move .blue-dot{transform:translate(-50%,-50%) scale(15);opacity:0;transition:transform .78s cubic-bezier(.2,.8,.2,1),opacity .3s .35s}
      .reveal .intro-logo,.move .intro-logo{opacity:1;transform:translate(-50%,-50%) scale(1)}
      .move{background:rgba(255,255,255,.96)}
      @keyframes dotIn{0%{transform:translate(-50%,-50%) scale(0)}65%{transform:translate(-50%,-50%) scale(1.35)}100%{transform:translate(-50%,-50%) scale(1)}}
      @media(prefers-reduced-motion:reduce){.cira-intro{display:none}}
    `}</style>
  </div>;
}
