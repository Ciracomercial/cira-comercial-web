"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { whatsappUrl } from "../lib/site";

const navigation = [
  ["Inicio", "#inicio"],
  ["Productos", "#categorias"],
  ["Soluciones", "#soluciones"],
  ["Preguntas frecuentes", "#preguntas"],
  ["Contacto", "#contacto"],
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={isScrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="container header-content">
        <a className="header-brand" href="#inicio" onClick={closeMenu} aria-label="Ir al inicio de Cira Comercial">
          <Image src="/assets/branding/cira-logo.png" alt="" width={44} height={44} priority />
          <span><strong>Cira Comercial</strong><small>Productos de limpieza y desechables</small></span>
        </a>

        <nav id="primary-navigation" className={isOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Navegación principal">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="button button-primary nav-quote" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Cotizar por WhatsApp
          </a>
        </nav>

        <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">{isOpen ? "Cerrar" : "Abrir"} menú</span>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
