"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "./reveal";
import { whatsappUrl } from "../lib/site";
import type { CatalogFilter, CatalogProduct } from "../lib/products";

const filters: CatalogFilter[] = ["Todos", "Hogar", "Industria", "Automotriz", "Papel y desechables", "Herramientas"];

export function Catalog({ products }: { products: CatalogProduct[] }) {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("Todos");
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLElement | null>(null);
  const visibleProducts = activeFilter === "Todos" ? products : products.filter((product) => product.category === activeFilter);

  useEffect(() => {
    if (!selectedProduct) return;

    const modal = modalRef.current;
    const focusable = () => Array.from(modal?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    focusable()[0]?.focus();

    const keepFocusInModal = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
      if (event.key !== "Tab") return;

      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", keepFocusInModal);
    return () => {
      document.removeEventListener("keydown", keepFocusInModal);
      triggerRef.current?.focus();
    };
  }, [selectedProduct]);

  const openProduct = (product: CatalogProduct, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="catalog-filters" aria-label="Filtrar categorías de productos">
        {filters.map((filter) => (
          <button className={filter === activeFilter ? "is-active" : ""} key={filter} type="button" aria-pressed={filter === activeFilter} onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>

      <div className="premium-product-grid">
        {visibleProducts.map((product, index) => (
          <Reveal key={product.title} delay={index * 65}>
          <button className="premium-product-card" type="button" aria-label={`Ver detalles de ${product.title}`} onClick={(event) => openProduct(product, event.currentTarget)}>
            <span className="product-image-wrap"><Image src={product.image} alt={`Productos de ${product.title} disponibles en Cira Comercial`} fill sizes="(max-width: 720px) 100vw, (max-width: 1050px) 50vw, 33vw" /></span>
            <span className="product-card-content"><span className="product-category">{product.category}</span><strong>{product.title}</strong><span className="product-description">{product.description}</span><span className="product-link">Ver productos <b aria-hidden="true">→</b></span></span>
          </button>
          </Reveal>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-modal-backdrop" role="presentation" onMouseDown={() => setSelectedProduct(null)}>
          <section className="product-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="product-modal-title" aria-describedby="product-modal-description" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Cerrar detalle de producto" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-image"><Image src={selectedProduct.image} alt={`Detalle de ${selectedProduct.title}`} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
            <div className="modal-content"><p className="eyebrow">{selectedProduct.category}</p><h3 id="product-modal-title">{selectedProduct.title}</h3><p id="product-modal-description">{selectedProduct.description}</p><h4>Características principales</h4><ul>{selectedProduct.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a></div>
          </section>
        </div>
      )}
    </>
  );
}
