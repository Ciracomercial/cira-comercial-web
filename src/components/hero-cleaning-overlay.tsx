"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const BRUSH_RADIUS = 82;

export function HeroCleaningOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cleaning, setCleaning] = useState(false);
  const [started, setStarted] = useState(false);
  const [cloth, setCloth] = useState({ x: 0, y: 0, visible: false });

  const paintDirt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(83, 72, 55, .34)";
    ctx.fillRect(0, 0, rect.width, rect.height);
    for (let i = 0; i < 115; i += 1) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const radius = 8 + Math.random() * 34;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(52, 43, 31, ${0.12 + Math.random() * 0.22})`);
      gradient.addColorStop(1, "rgba(52, 43, 31, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    paintDirt();
    const resize = () => paintDirt();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const wipe = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCloth({ x, y, visible: true });
    if (!cleaning) return;
    setStarted(true);
    const ratio = canvas.width / rect.width;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    const gradient = ctx.createRadialGradient(x, y, BRUSH_RADIUS * .25, x, y, BRUSH_RADIUS);
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(.72, "rgba(0,0,0,.95)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  return (
    <div className="hero-cleaning" aria-label="Experiencia interactiva: limpia el hero con la microfibra">
      <canvas
        ref={canvasRef}
        className="hero-dirt-canvas"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setCleaning(true);
          wipe(event);
        }}
        onPointerMove={wipe}
        onPointerUp={(event) => {
          setCleaning(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => setCleaning(false)}
        onPointerLeave={() => { if (!cleaning) setCloth((current) => ({ ...current, visible: false })); }}
      />
      {!started ? <div className="hero-cleaning-hint">Arrastra la microfibra para limpiar</div> : null}
      {cloth.visible ? (
        <div className={cleaning ? "hero-cleaning-cloth is-cleaning" : "hero-cleaning-cloth"} style={{ left: cloth.x, top: cloth.y }} aria-hidden="true">
          <Image src="/assets/microfibra-azul.png" alt="" width={150} height={112} priority />
        </div>
      ) : null}
    </div>
  );
}
