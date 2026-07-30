"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "../lib/site";

const navigation = [
  ["Inicio", "/"],
  ["Productos", "/productos"],
  ["Soluciones", "/#soluciones"],
  ["Nosotros", "/nosotros"],
  ["Preguntas frecuentes", "/#preguntas"],
  ["Contacto", "/contacto"],
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        requestAnimationFrame(() => menuToggleRef.current?.focus());
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={isScrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="container header-content">
        <Link className="header-brand" href="/" onClick={closeMenu} aria-label="Ir al inicio de Cira Comercial">
          <Image src="/assets/branding/cira-logo.png" alt="" width={44} height={44} priority />
          <span><strong>Cira Comercial</strong><small>Productos de limpieza y desechables</small></span>
        </Link>

        <nav id="primary-navigation" className={isOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Navegación principal">
          {navigation.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu} aria-current={href === pathname ? "page" : undefined}>{label}</Link>)}
          <a className="button button-primary nav-quote" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            Cotizar por WhatsApp
          </a>
        </nav>

        <button ref={menuToggleRef} className={isOpen ? "menu-toggle is-open" : "menu-toggle"} type="button" aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"} aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">{isOpen ? "Cerrar" : "Abrir"} menú</span>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
