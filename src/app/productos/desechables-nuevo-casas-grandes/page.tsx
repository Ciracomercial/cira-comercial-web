import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "../../../components/faq-accordion";
import { LocationMap } from "../../../components/location-map";
import { Reveal } from "../../../components/reveal";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";
import { business, googleMapsUrl, siteUrl, whatsappNumber } from "../../../lib/site";
import styles from "./page.module.css";

const pagePath = "/productos/desechables-nuevo-casas-grandes";
const pageTitle = "Desechables en Nuevo Casas Grandes | Cira Comercial";
const pageDescription = "Encuentra vasos, platos, cubiertos, contenedores, charolas, bolsas y otros desechables en Nuevo Casas Grandes, Chihuahua. Cotiza con Cira Comercial.";
const whatsappMessage = "Hola Cira Comercial, me interesa cotizar productos desechables en Nuevo Casas Grandes.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pagePath,
    type: "website",
    images: [{ url: "/images/og-cira-comercial.jpg", width: 1200, height: 630, alt: "Desechables en Nuevo Casas Grandes de Cira Comercial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/og-cira-comercial.jpg"],
  },
};

const categories = [
  "Vasos y tapas",
  "Platos desechables",
  "Cubiertos desechables",
  "Contenedores para alimentos",
  "Charolas",
  "Bolsas",
  "Popotes",
  "Servilletas y complementos",
];

const faqs = [
  { question: "¿Qué tipos de desechables manejan?", answer: "En Cira Comercial puedes consultar opciones de vasos y tapas, platos, cubiertos, contenedores para alimentos, charolas, bolsas, popotes, servilletas y complementos." },
  { question: "¿Manejan vasos y contenedores para alimentos?", answer: "Puedes comunicarte con nuestro equipo para consultar las opciones de vasos, tapas y contenedores para alimentos que necesites." },
  { question: "¿Puedo solicitar una cotización por WhatsApp?", answer: "Sí. Escríbenos por WhatsApp para consultar disponibilidad, presentaciones y opciones de productos desechables." },
  { question: "¿Los productos están siempre disponibles?", answer: "La disponibilidad puede cambiar. Te recomendamos consultar existencias y presentaciones directamente con nuestro equipo antes de acudir o realizar tu compra." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Productos", item: `${siteUrl}/productos` },
        { "@type": "ListItem", position: 3, name: "Desechables en Nuevo Casas Grandes", item: `${siteUrl}${pagePath}` },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: business.name,
      url: siteUrl,
      logo: `${siteUrl}${business.logoPath}`,
      image: `${siteUrl}/assets/business/interior-tienda.jpg`,
      description: "Productos de limpieza, desechables y soluciones para hogar, negocio e industria en Nuevo Casas Grandes, Chihuahua.",
      telephone: business.phone,
      email: business.email,
      hasMap: googleMapsUrl,
      contactPoint: { "@type": "ContactPoint", telephone: business.phone, contactType: "sales", availableLanguage: "es" },
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

export default function DisposableProductsLandingPage() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="about-hero" aria-labelledby="landing-title">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">Cira Comercial en Nuevo Casas Grandes</p>
            <h1 id="landing-title">Desechables en Nuevo Casas Grandes</h1>
            <p>En Cira Comercial manejamos distintas opciones de productos desechables para hogares, comercios, restaurantes, negocios e instituciones en Nuevo Casas Grandes, Chihuahua.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
              <Link className="button button-secondary" href="/productos">Ver productos</Link>
            </div>
          </div>
          <div className="about-hero-image"><Image src="/images/desechables-cira-comercial.jpeg" alt="Desechables, vasos y servilletas en Cira Comercial en Nuevo Casas Grandes" fill priority sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 64px), 48vw" quality={80} /></div>
        </div>
      </section>

      <section className={`contact-methods section ${styles.compactSection}`} aria-labelledby="landing-categories-title">
        <div className="container section-heading centered">
          <p className="eyebrow">Familias de desechables</p>
          <h2 id="landing-categories-title">Opciones para alimentos, bebidas y uso diario</h2>
          <p>Consulta las alternativas que pueden ayudarte a abastecer tu hogar, comercio, restaurante o institución.</p>
        </div>
        <div className="container contact-methods-grid">
          {categories.map((category) => <article className="contact-method-card" key={category}><span className="contact-method-icon" aria-hidden="true">✓</span><h3>{category}</h3><p>Consulta disponibilidad y presentaciones directamente con nuestro equipo.</p></article>)}
        </div>
        <div className="container" style={{ textAlign: "center", marginTop: "32px" }}><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar disponibilidad <span aria-hidden="true">→</span></a></div>
        <div className="container" style={{ marginTop: "22px", textAlign: "center" }}><Link className="category-back-link" href="/productos/vasos-desechables-nuevo-casas-grandes">Conoce las opciones de vasos desechables en Nuevo Casas Grandes</Link></div>
      </section>

      <section className={`coverage section ${styles.compactSection}`} aria-labelledby="landing-businesses-title">
        <Reveal className="container coverage-content">
          <p className="eyebrow">Atención para tu operación</p>
          <h2 id="landing-businesses-title">Desechables para comercios, restaurantes y negocios</h2>
          <p>Atendemos solicitudes de desechables para comercios, restaurantes, negocios e instituciones que buscan reunir productos para alimentos, bebidas y uso diario.</p>
          <p>Si buscas desechables y productos de plástico para tu negocio, nuestro equipo puede orientarte sobre las opciones disponibles. Consulta disponibilidad y presentaciones.</p>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Hablar con Cira Comercial <span aria-hidden="true">→</span></a>
        </Reveal>
      </section>

      <section className={`contact-details-section section ${styles.compactSection}`} aria-labelledby="landing-local-title">
        <Reveal className="container contact-details-layout">
          <div>
            <p className="eyebrow">Atención local</p>
            <h2 id="landing-local-title">Desechables en Nuevo Casas Grandes, Chihuahua</h2>
            <p>Visita Cira Comercial o escríbenos para conocer opciones de vasos, platos, cubiertos, contenedores, charolas y otros artículos desechables.</p>
            <p>Te ayudamos a revisar alternativas según tu necesidad. Consulta disponibilidad y presentaciones antes de acudir.</p>
            <div className="hero-actions">
              <a className="button button-secondary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="contact-address-card"><h3>Cira Comercial</h3><address>{business.streetAddress}, C.P. {business.postalCode}, {business.city}, {business.state}.</address><Link className="contact-method-link" href="/contacto">Ver todos los datos de contacto <span aria-hidden="true">→</span></Link></div>
        </Reveal>
      </section>

      <div className={styles.compactMap}><LocationMap /></div>

      <section className={`faq section ${styles.compactSection}`} aria-labelledby="landing-faq-title">
        <Reveal className="container faq-layout">
          <div><p className="eyebrow">Resolvemos tus dudas</p><h2 id="landing-faq-title">Preguntas frecuentes</h2><p>Si buscas una opción en particular, escríbenos por WhatsApp para orientarte.</p></div>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      <section className="final-cta" aria-labelledby="landing-cta-title">
        <Reveal className="container final-cta-content">
          <p className="eyebrow">Atención directa</p>
          <h2 id="landing-cta-title">¿Buscas desechables en Nuevo Casas Grandes?</h2>
          <p>Consulta disponibilidad, presentaciones y opciones directamente con nuestro equipo.</p>
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
