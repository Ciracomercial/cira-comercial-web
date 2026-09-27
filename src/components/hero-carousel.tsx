"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type PointerEvent } from "react";
import { whatsappUrl } from "../lib/site";

type HeroSlide = {
  image: string;
  alt: string;
  hasEmbeddedCopy?: boolean;
  objectFit?: "cover" | "contain";
  objectPosition: string;
};

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
    setLoadedSlides((currentSlides) => new Set(currentSlides).add(nextSlide));
    setActiveSlide(nextSlide);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateMotionPreference();
    updateVisibility();
    mediaQuery.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (isHovered || !isDocumentVisible || prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => {
        const nextSlide = (currentSlide + 1) % heroSlides.length;
        setLoadedSlides((currentSlides) => new Set(currentSlides).add(nextSlide));
        return nextSlide;
      });
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(interval);
  }, [isHovered, isDocumentVisible, prefersReducedMotion]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return;
    setPointerStartX(event.clientX);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) >= 45) goToSlide(activeSlide + (distance < 0 ? 1 : -1));
    setPointerStartX(null);
  };

  const activeSlideData = heroSlides[activeSlide];

  return (
    <section className={activeSlideData.hasEmbeddedCopy ? "hero hero-carousel has-embedded-copy" : "hero hero-carousel"} id="inicio" aria-labelledby="hero-title" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onPointerDown={handlePointerDown} onPointerUp={handlePointerEnd} onPointerCancel={() => setPointerStartX(null)}>
      <div className="hero-carousel-slides hero-intro-image" aria-live="off">
        {heroSlides.map((slide, index) => (
          <div className={index === activeSlide ? "hero-slide is-active" : "hero-slide"} key={slide.image} aria-hidden={index !== activeSlide}>
            {loadedSlides.has(index) ? <Image src={slide.image} alt={index === activeSlide ? slide.alt : ""} fill priority={index === 0} fetchPriority={index === 0 ? "high" : undefined} loading={index === 0 ? undefined : "lazy"} sizes="100vw" quality={75} style={{ objectFit: slide.objectFit ?? "cover", objectPosition: slide.objectPosition }} /> : null}
          </div>
        ))}
      </div>
      <div className="hero-carousel-overlay" aria-hidden="true" />

      <div className="container hero-carousel-content">
        <div className="hero-copy">
          <p className="eyebrow hero-intro hero-intro-1">Limpieza que sí rinde</p>
          <h1 className="hero-intro hero-intro-2" id="hero-title">Productos de limpieza para <em>tu hogar y negocio</em></h1>
          <p className="hero-description hero-intro hero-intro-3">Encuentra productos confiables, atención personalizada y entregas locales en Nuevo Casas Grandes, Chihuahua.</p>
          <ul className="hero-benefits hero-intro hero-intro-4" aria-label="Beneficios de Cira Comercial">
            <li>Atención personalizada</li><li>Entrega local</li><li>Facturación disponible</li>
          </ul>
          <div className="hero-actions hero-intro hero-intro-5">
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
            <a className="button button-secondary hero-catalog-button" href="#categorias">Ver catálogo</a>
          </div>
          <p className="trust-line hero-intro hero-intro-6"><span>★</span> Atención local para compras de todos los tamaños</p>
        </div>
      </div>

      <button className="hero-carousel-arrow hero-carousel-prev" type="button" aria-label="Ver imagen anterior" onClick={() => goToSlide(activeSlide - 1)}>‹</button>
      <button className="hero-carousel-arrow hero-carousel-next" type="button" aria-label="Ver imagen siguiente" onClick={() => goToSlide(activeSlide + 1)}>›</button>
      <div className="hero-carousel-dots" aria-label="Seleccionar imagen del hero">
        {heroSlides.map((slide, index) => <button className={index === activeSlide ? "is-active" : ""} type="button" key={slide.image} aria-label={`Ver imagen ${index + 1}`} aria-pressed={index === activeSlide} onClick={() => goToSlide(index)} />)}
      </div>

      <style jsx>{`
        .hero-intro { opacity: 0; transform: translateY(18px); animation: hero-rise .65s cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-intro-1 { animation-delay: .08s; }
        .hero-intro-2 { animation-delay: .16s; }
        .hero-intro-3 { animation-delay: .24s; }
        .hero-intro-4 { animation-delay: .32s; }
        .hero-intro-5 { animation-delay: .40s; }
        .hero-intro-6 { animation-delay: .48s; }
        .hero-intro-image { animation: hero-image-in .8s ease-out both; }
        @keyframes hero-rise { to { opacity: 1; transform: translateY(0); } }
        @keyframes hero-image-in { from { opacity: .72; transform: scale(1.012); } to { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-intro, .hero-intro-image { opacity: 1; transform: none; animation: none; }
        }
      `}</style>
    </section>
  );
}
