import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "../../../components/faq-accordion";
import { LocationMap } from "../../../components/location-map";
import { Reveal } from "../../../components/reveal";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";
import { business, googleMapsUrl, siteUrl, whatsappUrl } from "../../../lib/site";
import styles from "./page.module.css";

const pagePath = "/productos/productos-de-limpieza-nuevo-casas-grandes";
const pageTitle = "Productos de Limpieza en Nuevo Casas Grandes | Cira Comercial";
const pageDescription = "Encuentra productos de limpieza en Nuevo Casas Grandes, Chihuahua. Soluciones para hogares, negocios y empresas. Cotiza con Cira Comercial.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pagePath,
    type: "website",
    images: [{ url: "/images/og-cira-comercial.jpg", width: 1200, height: 630, alt: "Productos de limpieza en Nuevo Casas Grandes de Cira Comercial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/og-cira-comercial.jpg"],
  },
};

const categories = [
  "Productos para la limpieza",
  "Aromatizantes",
  "Bolsas para basura",
  "Cepillos y accesorios",
  "Papel institucional",
  "Productos para alberca",
  "Desechables",
];

const faqs = [
  { question: "¿Dónde comprar productos de limpieza en Nuevo Casas Grandes?", answer: "En Cira Comercial puedes consultar productos de limpieza y otras soluciones para hogares, negocios y empresas en Nuevo Casas Grandes, Chihuahua." },
  { question: "¿Cira Comercial vende productos para negocios?", answer: "Sí. Puedes consultar opciones de productos de limpieza, papel institucional, bolsas para basura, desechables y otras categorías para tu negocio." },
  { question: "¿Puedo consultar precios por WhatsApp?", answer: "Sí. Puedes comunicarte directamente con Cira Comercial para consultar disponibilidad, presentaciones y precios actuales." },
  { question: "¿Venden bolsas para basura?", answer: "Sí. Cira Comercial maneja bolsas para basura dentro de sus diferentes categorías de productos." },
  { question: "¿Venden papel institucional?", answer: "Sí. Puedes consultar las opciones disponibles de papel institucional directamente con Cira Comercial." },
  { question: "¿Cuentan con productos para alberca?", answer: "Sí. Cira Comercial también maneja productos para alberca. La disponibilidad puede variar, por lo que recomendamos consultar directamente." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Productos", item: `${siteUrl}/productos` },
        { "@type": "ListItem", position: 3, name: "Productos de Limpieza en Nuevo Casas Grandes", item: `${siteUrl}${pagePath}` },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: business.name,
      url: siteUrl,
      logo: `${siteUrl}${business.logoPath}`,
      image: `${siteUrl}/assets/business/interior-tienda.jpg`,
      priceRange: "$-$$",
      description: "Productos de limpieza, desechables y soluciones para hogar, negocio e industria en Nuevo Casas Grandes, Chihuahua.",
      telephone: business.phone,
      email: business.email,
      hasMap: googleMapsUrl,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: business.phone,
        contactType: "sales",
        availableLanguage: "es",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: business.streetAddress,
        postalCode: business.postalCode,
        addressLocality: business.city,
        addressRegion: business.state,
        addressCountry: business.country,
      },
      areaServed: { "@type": "City", name: `${business.city}, ${business.state}` },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: business.hours.weekdays.days, opens: business.hours.weekdays.opens, closes: business.hours.weekdays.closes },
        { "@type": "OpeningHoursSpecification", dayOfWeek: business.hours.saturday.days, opens: business.hours.saturday.opens, closes: business.hours.saturday.closes },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function CleaningProductsLandingPage() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="about-hero" aria-labelledby="landing-title">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">Cira Comercial en Nuevo Casas Grandes</p>
            <h1 id="landing-title">Productos de Limpieza en Nuevo Casas Grandes</h1>
            <p>Encuentra soluciones para mantener limpios y abastecidos tus espacios. En Cira Comercial ofrecemos productos de limpieza para hogares, comercios, oficinas y empresas en Nuevo Casas Grandes, Chihuahua.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
              <Link className="button button-secondary" href="/productos">Ver productos</Link>
            </div>
          </div>
          <div className="about-hero-image"><Image src="/assets/business/interior-tienda.jpg" alt="Interior de Cira Comercial con productos de limpieza en Nuevo Casas Grandes" fill priority sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 64px), 48vw" quality={80} /></div>
        </div>
      </section>

      <section className={`contact-methods section ${styles.compactSection}`} aria-labelledby="landing-categories-title">
        <div className="container section-heading centered">
          <p className="eyebrow">Categorías disponibles</p>
          <h2 id="landing-categories-title">Todo lo que necesitas para limpieza y mantenimiento</h2>
          <p>En Cira Comercial puedes encontrar diferentes categorías de productos para limpieza y uso diario.</p>
        </div>
        <div className="container contact-methods-grid">
          {categories.map((category) => <article className="contact-method-card" key={category}><span className="contact-method-icon" aria-hidden="true">✓</span><h3>{category}</h3><p>Consulta la disponibilidad de esta categoría directamente con nuestro equipo.</p></article>)}
        </div>
        <div className="container" style={{ textAlign: "center", marginTop: "32px" }}><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar disponibilidad <span aria-hidden="true">→</span></a></div>
      </section>

      <section className={`coverage section ${styles.compactSection}`} aria-labelledby="landing-clients-title">
        <Reveal className="container coverage-content">
          <p className="eyebrow">Atención para cada necesidad</p>
          <h2 id="landing-clients-title">Soluciones para hogar, negocio y empresa</h2>
          <p>Atendemos las necesidades de diferentes tipos de clientes en Nuevo Casas Grandes y la región.</p>
          <p>Ya sea que necesites productos para tu hogar, oficina, restaurante, comercio o empresa, puedes comunicarte con nosotros para conocer las opciones disponibles.</p>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Hablar con Cira Comercial <span aria-hidden="true">→</span></a>
        </Reveal>
      </section>

      <section className={`contact-details-section section ${styles.compactSection}`} aria-labelledby="landing-local-title">
        <Reveal className="container contact-details-layout">
          <div>
            <p className="eyebrow">Atención cercana</p>
            <h2 id="landing-local-title">Productos de limpieza cerca de ti</h2>
            <p>Comprar localmente te permite consultar directamente disponibilidad, presentaciones y opciones según lo que necesitas.</p>
            <p>En Cira Comercial puedes recibir atención directa y encontrar diferentes categorías de productos en un mismo lugar.</p>
            <div className="hero-actions">
              <a className="button button-secondary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="contact-address-card"><h3>Cira Comercial</h3><address>{business.streetAddress}, C.P. {business.postalCode}, {business.city}, {business.state}.</address><a className="contact-method-link" href="/contacto">Ver todos los datos de contacto <span aria-hidden="true">→</span></a></div>
        </Reveal>
      </section>

      <section className={`contact-details-section section ${styles.compactSection}`} aria-labelledby="landing-location-title">
        <div className="container section-heading"><p className="eyebrow">Ubicación y contacto</p><h2 id="landing-location-title">Productos de limpieza en Nuevo Casas Grandes, Chihuahua</h2></div>
        <Reveal className="container contact-details-layout">
          <div className="contact-address-card"><h3>{business.name}</h3><address>{business.streetAddress}, C.P. {business.postalCode}, {business.city}, {business.state}.</address><p>{business.hours.weekdays.display}<br />{business.hours.saturday.display}</p></div>
          <div className="contact-address-card"><h3>Contáctanos</h3><p><a className="contact-method-link" href={`tel:${business.phone}`}>{business.phoneDisplay}</a></p><p><a className="contact-method-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {business.phoneDisplay}</a></p><div className="hero-actions"><a className="button button-secondary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Obtener indicaciones <span aria-hidden="true">↗</span></a><a className="button button-primary" href={`tel:${business.phone}`}>Llamar ahora</a></div></div>
        </Reveal>
      </section>

      <div className={styles.compactMap}><LocationMap /></div>

      <section className={`faq section ${styles.compactSection}`} aria-labelledby="landing-faq-title">
        <Reveal className="container faq-layout">
          <div><p className="eyebrow">Resolvemos tus dudas</p><h2 id="landing-faq-title">Preguntas frecuentes</h2><p>Si necesitas orientación sobre algún producto o categoría, escríbenos por WhatsApp.</p></div>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      <section className="final-cta" aria-labelledby="landing-cta-title">
        <Reveal className="container final-cta-content">
          <p className="eyebrow">Atención directa</p>
          <h2 id="landing-cta-title">¿Buscas productos de limpieza en Nuevo Casas Grandes?</h2>
          <p>Consulta disponibilidad, precios y opciones directamente con nuestro equipo.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Visitar Cira Comercial <span aria-hidden="true">↗</span></a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
