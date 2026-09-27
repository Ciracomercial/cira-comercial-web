"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type PointerEvent } from "react";
import { whatsappUrl } from "../lib/site";

type HeroSlide = { image: string; alt: string; hasEmbeddedCopy?: boolean; objectFit?: "cover" | "contain"; objectPosition: string; };
const heroSlides: readonly HeroSlide[] = [
  { image: "/assets/hero/hero-1.webp", alt: "Productos de limpieza y desechables disponibles en Cira Comercial", objectPosition: "center" },
  { image: "/assets/hero/hero-2.webp", alt: "Surtido de productos de limpieza para hogar y negocio", objectPosition: "65% center" },
  { image: "/assets/hero/hero-3.webp", alt: "Artículos de limpieza y jarciería en exhibición en Cira Comercial", objectPosition: "center 40%" },
  { image: "/assets/hero/bouquet2.webp", alt: "Aroma Bouquet Super Concentrado de Cira Comercial en presentación de 125 ml", hasEmbeddedCopy: true, objectFit: "contain", objectPosition: "center" },
];
const SLIDE_INTERVAL = 5000;

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [isHovered, setIsHovered] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pointerStartX, setPointerStartX] = useState<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    const nextSlide = (index + heroSlides.length) % heroSlides.length;
    setLoadedSlides((current) => new Set(current).add(nextSlide));
    setActiveSlide(nextSlide);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setPrefersReducedMotion(media.matches);
    const visibility = () => setIsDocumentVisible(!document.hidden);
    motion(); visibility();
    media.addEventListener("change", motion); document.addEventListener("visibilitychange", visibility);
    return () => { media.removeEventListener("change", motion); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    if (isHovered || !isDocumentVisible || prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => {
        const next = (current + 1) % heroSlides.length;
        setLoadedSlides((slides) => new Set(slides).add(next));
        return next;
      });
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(interval);
  }, [isHovered, isDocumentVisible, prefersReducedMotion]);

  const handleHeroMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const hero = event.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    hero.style.setProperty("--hero-x", `${(x * 100).toFixed(1)}%`);
    hero.style.setProperty("--hero-y", `${(y * 100).toFixed(1)}%`);
    hero.style.setProperty("--hero-shift-x", `${((x - .5) * 26).toFixed(1)}px`);
    hero.style.setProperty("--hero-shift-y", `${((y - .5) * 18).toFixed(1)}px`);
    hero.style.setProperty("--copy-shift-x", `${((.5 - x) * 8).toFixed(1)}px`);
    hero.style.setProperty("--copy-shift-y", `${((.5 - y) * 5).toFixed(1)}px`);
  };

  const resetHero = (event: PointerEvent<HTMLElement>) => {
    const hero = event.currentTarget;
    hero.style.setProperty("--hero-x", "70%"); hero.style.setProperty("--hero-y", "35%");
    hero.style.setProperty("--hero-shift-x", "0px"); hero.style.setProperty("--hero-shift-y", "0px");
    hero.style.setProperty("--copy-shift-x", "0px"); hero.style.setProperty("--copy-shift-y", "0px");
    setIsHovered(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => { if (event.pointerType !== "mouse") setPointerStartX(event.clientX); };
  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) >= 45) goToSlide(activeSlide + (distance < 0 ? 1 : -1));
    setPointerStartX(null);
  };
  const activeSlideData = heroSlides[activeSlide];

  return (
    <section className={activeSlideData.hasEmbeddedCopy ? "hero hero-carousel hero-interactive has-embedded-copy" : "hero hero-carousel hero-interactive"} id="inicio" aria-labelledby="hero-title" onMouseEnter={() => setIsHovered(true)} onPointerMove={handleHeroMove} onPointerLeave={resetHero} onPointerDown={handlePointerDown} onPointerUp={handlePointerEnd} onPointerCancel={() => setPointerStartX(null)}>
      <div className="hero-carousel-slides hero-intro-image" aria-live="off">
        {heroSlides.map((slide, index) => <div className={index === activeSlide ? "hero-slide is-active" : "hero-slide"} key={slide.image} aria-hidden={index !== activeSlide}>{loadedSlides.has(index) ? <Image src={slide.image} alt={index === activeSlide ? slide.alt : ""} fill priority={index === 0} fetchPriority={index === 0 ? "high" : undefined} loading={index === 0 ? undefined : "lazy"} sizes="100vw" quality={75} style={{ objectFit: slide.objectFit ?? "cover", objectPosition: slide.objectPosition }} /> : null}</div>)}
      </div>
      <div className="hero-carousel-overlay" aria-hidden="true" />
      <div className="hero-cursor-light" aria-hidden="true" />
      <div className="hero-floating-bubble bubble-one" aria-hidden="true" />
      <div className="hero-floating-bubble bubble-two" aria-hidden="true" />
      <div className="container hero-carousel-content">
        <div className="hero-copy hero-parallax-copy">
          <p className="eyebrow hero-intro hero-intro-1">Limpieza que sí rinde</p>
          <h1 className="hero-intro hero-intro-2" id="hero-title">Productos de limpieza para <em>tu hogar y negocio</em></h1>
          <p className="hero-description hero-intro hero-intro-3">Encuentra productos confiables, atención personalizada y entregas locales en Nuevo Casas Grandes, Chihuahua.</p>
          <ul className="hero-benefits hero-intro hero-intro-4" aria-label="Beneficios de Cira Comercial"><li>Atención personalizada</li><li>Entrega local</li><li>Facturación disponible</li></ul>
          <div className="hero-actions hero-intro hero-intro-5"><a className="button button-primary hero-magnetic" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a><a className="button button-secondary hero-catalog-button hero-magnetic" href="#categorias">Ver catálogo</a></div>
          <p className="trust-line hero-intro hero-intro-6"><span>★</span> Atención local para compras de todos los tamaños</p>
        </div>
      </div>
      <div className="hero-move-hint" aria-hidden="true"><span>↗</span> Mueve el cursor</div>
      <button className="hero-carousel-arrow hero-carousel-prev" type="button" aria-label="Ver imagen anterior" onClick={() => goToSlide(activeSlide - 1)}>‹</button>
      <button className="hero-carousel-arrow hero-carousel-next" type="button" aria-label="Ver imagen siguiente" onClick={() => goToSlide(activeSlide + 1)}>›</button>
      <div className="hero-carousel-dots" aria-label="Seleccionar imagen del hero">{heroSlides.map((slide, index) => <button className={index === activeSlide ? "is-active" : ""} type="button" key={slide.image} aria-label={`Ver imagen ${index + 1}`} aria-pressed={index === activeSlide} onClick={() => goToSlide(index)} />)}</div>
      <style jsx>{`
        .hero-interactive{--hero-x:70%;--hero-y:35%;--hero-shift-x:0px;--hero-shift-y:0px;--copy-shift-x:0px;--copy-shift-y:0px;position:relative;isolation:isolate}
        .hero-interactive .hero-carousel-slides{transform:scale(1.055) translate3d(var(--hero-shift-x),var(--hero-shift-y),0);transition:transform .18s ease-out;will-change:transform}
        .hero-cursor-light{position:absolute;z-index:1;inset:0;pointer-events:none;background:radial-gradient(circle 360px at var(--hero-x) var(--hero-y),rgba(255,255,255,.24),transparent 68%);mix-blend-mode:soft-light}
        .hero-parallax-copy{position:relative;z-index:3;transform:translate3d(var(--copy-shift-x),var(--copy-shift-y),0);transition:transform .22s ease-out;will-change:transform}
        .hero-floating-bubble{position:absolute;z-index:2;border:1px solid rgba(255,255,255,.32);background:rgba(255,255,255,.1);backdrop-filter:blur(8px);border-radius:999px;pointer-events:none;box-shadow:0 18px 50px rgba(20,30,75,.12)}
        .bubble-one{width:82px;height:82px;right:12%;top:17%;transform:translate3d(calc(var(--hero-shift-x) * -.7),calc(var(--hero-shift-y) * -.7),0)}
        .bubble-two{width:42px;height:42px;right:27%;bottom:20%;transform:translate3d(calc(var(--hero-shift-x) * .9),calc(var(--hero-shift-y) * .9),0)}
        .hero-move-hint{position:absolute;z-index:4;right:32px;top:30px;display:flex;align-items:center;gap:7px;padding:8px 11px;border:1px solid rgba(255,255,255,.34);border-radius:999px;color:#fff;background:rgba(20,30,75,.22);backdrop-filter:blur(8px);font-size:.72rem;font-weight:800;letter-spacing:.03em;pointer-events:none;opacity:.85}
        .hero-move-hint span{display:inline-block;animation:hint-move 1.7s ease-in-out infinite}
        .hero-magnetic{transition:transform .22s ease,background .2s,box-shadow .2s}.hero-magnetic:hover{transform:translateY(-5px) scale(1.025)}
        .hero-intro{opacity:0;transform:translateY(18px);animation:hero-rise .65s cubic-bezier(.2,.7,.2,1) forwards}.hero-intro-1{animation-delay:.08s}.hero-intro-2{animation-delay:.16s}.hero-intro-3{animation-delay:.24s}.hero-intro-4{animation-delay:.32s}.hero-intro-5{animation-delay:.40s}.hero-intro-6{animation-delay:.48s}.hero-intro-image{animation:hero-image-in .8s ease-out both}
        @keyframes hero-rise{to{opacity:1;transform:translateY(0)}}@keyframes hero-image-in{from{opacity:.72}to{opacity:1}}@keyframes hint-move{0%,100%{transform:translate(0,0)}50%{transform:translate(3px,-3px)}}
        @media(max-width:760px){.hero-move-hint,.hero-floating-bubble{display:none}.hero-interactive .hero-carousel-slides{transform:scale(1.02)}}
        @media(prefers-reduced-motion:reduce){.hero-intro,.hero-intro-image{opacity:1;transform:none;animation:none}.hero-interactive .hero-carousel-slides,.hero-parallax-copy,.hero-floating-bubble{transform:none!important;transition:none}.hero-cursor-light,.hero-move-hint{display:none}}
      `}</style>
    </section>
  );
}
