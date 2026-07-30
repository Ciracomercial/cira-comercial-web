"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type PointerEvent } from "react";
import { whatsappUrl } from "../lib/site";

const heroSlides = [
  { image: "/assets/business/interior-tienda.jpg", alt: "Interior de Cira Comercial con productos de limpieza y desechables", position: "center" },
  { image: "/assets/products/limpiadores-estante.jpeg", alt: "Estante con productos de limpieza disponibles en Cira Comercial", position: "center" },
  { image: "/assets/products/surtido-tienda.jpeg", alt: "Surtido de productos y desechables para hogar y negocio", position: "center" },
  { image: "/assets/products/detergentes.jpeg", alt: "Productos de limpieza y detergentes disponibles en Cira Comercial", position: "center" },
] as const;

const SLIDE_INTERVAL = 5000;

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pointerStartX, setPointerStartX] = useState<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
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
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
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

  return (
    <section className="hero hero-carousel" id="inicio" aria-labelledby="hero-title" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onPointerDown={handlePointerDown} onPointerUp={handlePointerEnd} onPointerCancel={() => setPointerStartX(null)}>
      <div className="hero-carousel-slides" aria-live="off">
        {heroSlides.map((slide, index) => (
          <div className={index === activeSlide ? "hero-slide is-active" : "hero-slide"} key={slide.image} aria-hidden={index !== activeSlide}>
            <Image src={slide.image} alt={index === activeSlide ? slide.alt : ""} fill priority={index === 0} loading={index === 0 ? undefined : "lazy"} sizes="100vw" quality={80} style={{ objectPosition: slide.position }} />
          </div>
        ))}
      </div>
      <div className="hero-carousel-overlay" aria-hidden="true" />

      <div className="container hero-carousel-content">
        <div className="hero-copy">
          <p className="eyebrow">Limpieza que sí rinde</p>
          <h1 id="hero-title">Productos de limpieza para <em>tu hogar y negocio</em></h1>
          <p className="hero-description">Encuentra productos confiables, atención personalizada y entregas locales en Nuevo Casas Grandes, Chihuahua.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
            <a className="button button-secondary hero-catalog-button" href="#categorias">Ver catálogo</a>
          </div>
          <p className="trust-line"><span>★</span> Atención local para compras de todos los tamaños</p>
        </div>
      </div>

      <button className="hero-carousel-arrow hero-carousel-prev" type="button" aria-label="Ver imagen anterior" onClick={() => goToSlide(activeSlide - 1)}>‹</button>
      <button className="hero-carousel-arrow hero-carousel-next" type="button" aria-label="Ver imagen siguiente" onClick={() => goToSlide(activeSlide + 1)}>›</button>
      <div className="hero-carousel-dots" aria-label="Seleccionar imagen del hero">
        {heroSlides.map((slide, index) => <button className={index === activeSlide ? "is-active" : ""} type="button" key={slide.image} aria-label={`Ver imagen ${index + 1}`} aria-pressed={index === activeSlide} onClick={() => goToSlide(index)} />)}
      </div>
    </section>
  );
}
