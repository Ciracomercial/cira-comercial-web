"use client";

import Image from "next/image";
import { useEffect, useState, type PointerEvent } from "react";
import { getCategoryWhatsappUrl, productCategories } from "../lib/product-categories";

export function ProductCategoryGrid() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
    card.style.setProperty("--spot-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty("--spot-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = (event: PointerEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
  };

  return (
    <div className="product-category-grid interactive-category-grid">
      {productCategories.map((category) => (
        <a
          className="product-category-card interactive-category-card"
          href={getCategoryWhatsappUrl(category.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Solicitar información sobre ${category.name} por WhatsApp`}
          key={category.name}
          onPointerMove={handleMove}
          onPointerLeave={resetTilt}
        >
          <span className="category-interaction-glow" aria-hidden="true" />
          <span className="product-category-image"><Image src={category.image} alt={`Categoría ${category.name} de Cira Comercial`} fill sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(50vw - 38px), (max-width: 1200px) calc(33vw - 32px), 366px" quality={75} /></span>
          <div className="product-category-card-content">
            <h3>{category.name}</h3>
            <span className="product-category-description">{category.description}</span>
            <span className="category-interaction-cta">Consultar <b aria-hidden="true">→</b></span>
          </div>
        </a>
      ))}
    </div>
  );
}
