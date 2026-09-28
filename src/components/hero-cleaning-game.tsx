"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

export function HeroCleaningGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastPoint = useRef<{x:number;y:number}|null>(null);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [cloth, setCloth] = useState({x: 78, y: 70});

  const paintDirt = useCallback(() => {
    const canvas = canvasRef.current; const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const g = ctx.createLinearGradient(0,0,rect.width,rect.height);
    g.addColorStop(0,"rgba(93,75,54,.78)"); g.addColorStop(.45,"rgba(72,62,48,.67)"); g.addColorStop(1,"rgba(112,91,64,.74)");
    ctx.fillStyle=g; ctx.fillRect(0,0,rect.width,rect.height);
    for(let i=0;i<130;i++){
      const x=Math.random()*rect.width,y=Math.random()*rect.height,r=8+Math.random()*42;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=`rgba(45,37,29,${.025+Math.random()*.075})`; ctx.fill();
    }
    ctx.strokeStyle="rgba(210,194,164,.13)"; ctx.lineWidth=3;
    for(let i=0;i<18;i++){ctx.beginPath();ctx.moveTo(Math.random()*rect.width,Math.random()*rect.height);ctx.lineTo(Math.random()*rect.width,Math.random()*rect.height);ctx.stroke();}
  },[]);

  useEffect(()=>{paintDirt(); const resize=()=>paintDirt(); window.addEventListener("resize",resize); return()=>window.removeEventListener("resize",resize)},[paintDirt]);

  const eraseAt=(x:number,y:number)=>{
    const canvas=canvasRef.current; if(!canvas)return; const ctx=canvas.getContext("2d"); if(!ctx)return;
    const dpr=Math.min(window.devicePixelRatio||1,2); ctx.save(); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.globalCompositeOperation="destination-out";
    const radius=62; const grad=ctx.createRadialGradient(x,y,10,x,y,radius); grad.addColorStop(0,"rgba(0,0,0,1)"); grad.addColorStop(.72,"rgba(0,0,0,.96)"); grad.addColorStop(1,"rgba(0,0,0,0)"); ctx.fillStyle=grad;
    ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.fill();ctx.restore();
  };

  const point=(event:PointerEvent<HTMLDivElement>)=>{const rect=event.currentTarget.getBoundingClientRect();return{x:event.clientX-rect.left,y:event.clientY-rect.top,px:(event.clientX-rect.left)/rect.width*100,py:(event.clientY-rect.top)/rect.height*100}};
  const down=(event:PointerEvent<HTMLDivElement>)=>{if(complete)return; dragging.current=true; event.currentTarget.setPointerCapture(event.pointerId); const p=point(event); lastPoint.current={x:p.x,y:p.y};setCloth({x:p.px,y:p.py});setStarted(true);eraseAt(p.x,p.y)};
  const move=(event:PointerEvent<HTMLDivElement>)=>{if(!dragging.current||complete)return;const p=point(event);setCloth({x:p.px,y:p.py});const last=lastPoint.current;if(last){const dx=p.x-last.x,dy=p.y-last.y,dist=Math.hypot(dx,dy);const steps=Math.max(1,Math.ceil(dist/18));for(let i=1;i<=steps;i++)eraseAt(last.x+dx*i/steps,last.y+dy*i/steps)}eraseAt(p.x,p.y);lastPoint.current={x:p.x,y:p.y}};
  const up=()=>{dragging.current=false;lastPoint.current=null};
  const finish=()=>{setComplete(true); const canvas=canvasRef.current;if(canvas)canvas.style.opacity="0"};

  return <div ref={wrapRef} className={complete?"cleaning-game is-complete":"cleaning-game"} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
    <canvas ref={canvasRef} className="dirt-canvas" aria-hidden="true" />
    {!complete && <>
      <div className="cleaning-instruction"><strong>{started?"¡Eso es! Sigue limpiando":"¡Esta página necesita una limpieza!"}</strong><span>Arrastra la microfibra sobre la suciedad</span></div>
      <div className="microfiber" style={{left:`${cloth.x}%`,top:`${cloth.y}%`}} aria-hidden="true"><span className="cloth-fold"/><span className="cloth-label">CIRA</span></div>
      <button className="clean-skip" type="button" onPointerDown={e=>e.stopPropagation()} onClick={finish}>{started?"Terminar limpieza":"Omitir"}</button>
    </>}
    {complete && <div className="clean-result" aria-hidden="true">Así se ve mejor.</div>}
    <style jsx>{`
      .cleaning-game{position:absolute;z-index:12;inset:0;overflow:hidden;touch-action:none;cursor:grab}.cleaning-game:active{cursor:grabbing}.dirt-canvas{position:absolute;inset:0;width:100%;height:100%;transition:opacity .7s ease;pointer-events:none}.cleaning-instruction{position:absolute;z-index:3;left:50%;top:22px;transform:translateX(-50%);display:grid;gap:2px;min-width:min(390px,calc(100% - 110px));padding:10px 18px;border:1px solid rgba(255,255,255,.3);border-radius:15px;color:#fff;background:rgba(25,27,25,.66);backdrop-filter:blur(9px);text-align:center;box-shadow:0 12px 32px rgba(0,0,0,.18);pointer-events:none}.cleaning-instruction strong{font-size:.92rem}.cleaning-instruction span{font-size:.72rem;opacity:.85}.microfiber{position:absolute;z-index:4;width:112px;height:78px;transform:translate(-50%,-50%) rotate(-9deg);border-radius:12px 18px 14px 17px;background:linear-gradient(135deg,#61d7d3,#2caeae 62%,#198f94);box-shadow:0 15px 24px rgba(0,0,0,.28),inset 0 0 0 2px rgba(255,255,255,.2);pointer-events:none;transition:left .035s linear,top .035s linear}.microfiber:before,.microfiber:after{content:"";position:absolute;inset:8px;border-radius:9px;border:1px dashed rgba(255,255,255,.28)}.microfiber:after{inset:auto 10px 7px;width:35px;height:5px;border:0;background:rgba(255,255,255,.22);filter:blur(2px)}.cloth-fold{position:absolute;right:-4px;top:8px;width:30px;height:57px;border-radius:6px 12px 12px 5px;background:rgba(18,123,128,.5);transform:skewY(-8deg)}.cloth-label{position:absolute;left:14px;bottom:12px;color:rgba(255,255,255,.88);font-size:.62rem;font-weight:900;letter-spacing:.14em}.clean-skip{position:absolute;z-index:5;right:22px;bottom:22px;padding:9px 14px;border:1px solid rgba(255,255,255,.45);border-radius:999px;color:#fff;background:rgba(20,25,30,.55);backdrop-filter:blur(7px);cursor:pointer;font-weight:800}.clean-result{position:absolute;z-index:2;right:25px;bottom:25px;padding:9px 14px;border-radius:999px;color:#fff;background:rgba(36,50,113,.86);font-size:.78rem;font-weight:800;animation:result-in .5s ease both}.is-complete{pointer-events:none}.is-complete .clean-result{pointer-events:none}@keyframes result-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(max-width:650px){.microfiber{width:90px;height:64px}.cleaning-instruction{top:12px;min-width:calc(100% - 90px);padding:8px 12px}.clean-skip{right:12px;bottom:12px}}@media(prefers-reduced-motion:reduce){.dirt-canvas,.microfiber{transition:none}.clean-result{animation:none}}
    `}</style>
  </div>;
}
