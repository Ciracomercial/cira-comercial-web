"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { whatsappUrl } from "../lib/site";
import { HeroCleaningGame } from "./hero-cleaning-game";

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
  const goToSlide = useCallback((index:number)=>{const next=(index+heroSlides.length)%heroSlides.length;setLoadedSlides(c=>new Set(c).add(next));setActiveSlide(next)},[]);
  useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const motion=()=>setPrefersReducedMotion(media.matches);const visibility=()=>setIsDocumentVisible(!document.hidden);motion();visibility();media.addEventListener("change",motion);document.addEventListener("visibilitychange",visibility);return()=>{media.removeEventListener("change",motion);document.removeEventListener("visibilitychange",visibility)}},[]);
  useEffect(()=>{if(isHovered||!isDocumentVisible||prefersReducedMotion)return;const interval=window.setInterval(()=>setActiveSlide(current=>{const next=(current+1)%heroSlides.length;setLoadedSlides(slides=>new Set(slides).add(next));return next}),SLIDE_INTERVAL);return()=>window.clearInterval(interval)},[isHovered,isDocumentVisible,prefersReducedMotion]);
  const activeSlideData=heroSlides[activeSlide];
  return <section className={activeSlideData.hasEmbeddedCopy?"hero hero-carousel has-embedded-copy":"hero hero-carousel"} id="inicio" aria-labelledby="hero-title" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
    <div className="hero-carousel-slides" aria-live="off">{heroSlides.map((slide,index)=><div className={index===activeSlide?"hero-slide is-active":"hero-slide"} key={slide.image} aria-hidden={index!==activeSlide}>{loadedSlides.has(index)?<Image src={slide.image} alt={index===activeSlide?slide.alt:""} fill priority={index===0} fetchPriority={index===0?"high":undefined} loading={index===0?undefined:"lazy"} sizes="100vw" quality={75} style={{objectFit:slide.objectFit??"cover",objectPosition:slide.objectPosition}}/>:null}</div>)}</div>
    <div className="hero-carousel-overlay" aria-hidden="true"/>
    <div className="container hero-carousel-content"><div className="hero-copy"><p className="eyebrow">Limpieza que sí rinde</p><h1 id="hero-title">Productos de limpieza para <em>tu hogar y negocio</em></h1><p className="hero-description">Encuentra productos confiables, atención personalizada y entregas locales en Nuevo Casas Grandes, Chihuahua.</p><ul className="hero-benefits" aria-label="Beneficios de Cira Comercial"><li>Atención personalizada</li><li>Entrega local</li><li>Facturación disponible</li></ul><div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a><a className="button button-secondary hero-catalog-button" href="#categorias">Ver catálogo</a></div><p className="trust-line"><span>★</span> Atención local para compras de todos los tamaños</p></div></div>
    <button className="hero-carousel-arrow hero-carousel-prev" type="button" aria-label="Ver imagen anterior" onClick={()=>goToSlide(activeSlide-1)}>‹</button><button className="hero-carousel-arrow hero-carousel-next" type="button" aria-label="Ver imagen siguiente" onClick={()=>goToSlide(activeSlide+1)}>›</button><div className="hero-carousel-dots" aria-label="Seleccionar imagen del hero">{heroSlides.map((slide,index)=><button className={index===activeSlide?"is-active":""} type="button" key={slide.image} aria-label={`Ver imagen ${index+1}`} aria-pressed={index===activeSlide} onClick={()=>goToSlide(index)}/>)}</div>
    <HeroCleaningGame />
  </section>;
}
