"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
const BRUSH_RADIUS = 82;
export function HeroCleaningOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cleaning, setCleaning] = useState(false);
  const cleaningRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [cloth, setCloth] = useState({ x: 0, y: 0, visible: false });
  const paintDirt = () => { const canvas = canvasRef.current; if (!canvas) return; const rect = canvas.getBoundingClientRect(); const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.round(rect.width * ratio); canvas.height = Math.round(rect.height * ratio); const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.setTransform(ratio,0,0,ratio,0,0); ctx.globalCompositeOperation="source-over"; ctx.clearRect(0,0,rect.width,rect.height); ctx.fillStyle="rgba(83,72,55,.34)"; ctx.fillRect(0,0,rect.width,rect.height); for(let i=0;i<115;i+=1){const x=Math.random()*rect.width,y=Math.random()*rect.height,r=8+Math.random()*34,g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(52,43,31,${.12+Math.random()*.22})`);g.addColorStop(1,"rgba(52,43,31,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}};
  useEffect(()=>{paintDirt(); const resize=()=>paintDirt(); window.addEventListener("resize",resize); return()=>window.removeEventListener("resize",resize);},[]);
  const wipe=(event:PointerEvent<HTMLCanvasElement>, force=false)=>{const canvas=canvasRef.current;if(!canvas)return;const rect=canvas.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;setCloth({x,y,visible:true});if(!force&&!cleaningRef.current)return;setStarted(true);const ratio=canvas.width/rect.width,ctx=canvas.getContext("2d");if(!ctx)return;ctx.save();ctx.setTransform(ratio,0,0,ratio,0,0);ctx.globalCompositeOperation="destination-out";const g=ctx.createRadialGradient(x,y,BRUSH_RADIUS*.25,x,y,BRUSH_RADIUS);g.addColorStop(0,"rgba(0,0,0,1)");g.addColorStop(.72,"rgba(0,0,0,.95)");g.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,BRUSH_RADIUS,0,Math.PI*2);ctx.fill();ctx.restore();};
  return <div className="hero-cleaning" aria-label="Experiencia interactiva: limpia el hero con la microfibra">
    <canvas ref={canvasRef} className="hero-dirt-canvas" onPointerDown={e=>{e.stopPropagation();e.currentTarget.setPointerCapture(e.pointerId);cleaningRef.current=true;setCleaning(true);wipe(e,true);}} onPointerMove={e=>{e.stopPropagation();wipe(e);}} onPointerUp={e=>{e.stopPropagation();cleaningRef.current=false;setCleaning(false);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onPointerCancel={()=>{cleaningRef.current=false;setCleaning(false);}} onPointerLeave={()=>{if(!cleaningRef.current)setCloth(c=>({...c,visible:false}));}} />
    {!started?<div className="hero-cleaning-hint">Arrastra la microfibra para limpiar</div>:null}
    {cloth.visible?<div className={cleaning?"hero-cleaning-cloth is-cleaning":"hero-cleaning-cloth"} style={{left:cloth.x,top:cloth.y}} aria-hidden="true"><Image src="/assets/microfibra-azul.png" alt="" width={150} height={112} priority /></div>:null}
    <style jsx>{`
      .hero-cleaning{position:absolute;z-index:12;inset:0;overflow:hidden;touch-action:none}
      .hero-dirt-canvas{position:absolute;inset:0;width:100%;height:100%;cursor:none;touch-action:none}
      .hero-cleaning-cloth{position:absolute;z-index:2;width:150px;height:112px;pointer-events:none;transform:translate(-50%,-50%) rotate(-9deg);filter:drop-shadow(0 10px 10px rgba(0,0,0,.25));transition:transform .08s ease}
      .hero-cleaning-cloth.is-cleaning{transform:translate(-50%,-50%) rotate(-13deg) scale(.96)}
      .hero-cleaning-cloth :global(img){width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
      .hero-cleaning-hint{position:absolute;z-index:3;left:50%;bottom:24px;transform:translateX(-50%);padding:10px 17px;border:1px solid rgba(255,255,255,.65);border-radius:999px;color:#fff;background:rgba(17,21,43,.72);box-shadow:0 8px 25px rgba(0,0,0,.18);backdrop-filter:blur(8px);font-size:.86rem;font-weight:800;pointer-events:none;animation:hintPulse 1.8s ease-in-out infinite}
      @keyframes hintPulse{50%{transform:translateX(-50%) translateY(-4px)}}
      @media(max-width:700px){.hero-cleaning-cloth{width:115px;height:86px}.hero-cleaning-hint{bottom:16px;font-size:.76rem;white-space:nowrap}}
      @media(prefers-reduced-motion:reduce){.hero-cleaning-hint{animation:none}}
    `}</style>
  </div>;
}
