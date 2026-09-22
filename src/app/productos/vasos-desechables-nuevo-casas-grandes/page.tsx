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

const pagePath = "/productos/vasos-desechables-nuevo-casas-grandes";
const pageTitle = "Vasos Desechables en Nuevo Casas Grandes | Cira Comercial";
const pageDescription = "Consulta vasos desechables, vasos de plástico, vasos térmicos, tapas y portavasos en Nuevo Casas Grandes, Chihuahua. Cotiza con Cira Comercial.";
const whatsappMessage = "Hola, vi los vasos desechables en su página web y quisiera consultar disponibilidad y presentaciones.";
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
    images: [{ url: "/images/vasos-desechables-cira.jpeg", width: 900, height: 1600, alt: "Vasos desechables disponibles en Cira Comercial en Nuevo Casas Grandes, Chihuahua" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/vasos-desechables-cira.jpeg"],
  },
};

const cupTypes = [
  "Vasos de plástico",
  "Vasos transparentes",
  "Vasos térmicos",
  "Vasos para bebidas",
  "Vasos pequeños para porciones y salsas",
  "Vasos de papel",
];

const faqs = [
  { question: "¿Qué tipos de vasos desechables manejan?", answer: "Puedes consultar opciones de vasos de plástico, transparentes, térmicos, para bebidas, vasos pequeños para porciones y salsas, así como vasos de papel." },
  { question: "¿Tienen vasos de plástico de diferentes tamaños?", answer: "Manejamos distintas opciones y tamaños de vasos. Consulta disponibilidad y presentaciones con nuestro equipo para encontrar una alternativa adecuada." },
  { question: "¿Manejan vasos térmicos?", answer: "Sí. Puedes consultar con nuestro equipo las opciones de vasos térmicos disponibles según el tipo de bebida que necesites servir." },
  { question: "¿Tienen tapas para vasos?", answer: "Cira Comercial también maneja tapas para vasos y portavasos. Estos complementos están sujetos a disponibilidad." },
  { question: "¿Dónde puedo comprar vasos desechables en Nuevo Casas Grandes?", answer: "Puedes visitar Cira Comercial en Nuevo Casas Grandes, Chihuahua, o escribirnos por WhatsApp para consultar opciones de vasos desechables." },
  { question: "¿Cómo puedo consultar disponibilidad?", answer: "Escríbenos por WhatsApp y cuéntanos qué tipo de vaso necesitas. Te ayudaremos a revisar disponibilidad y presentaciones." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Productos", item: `${siteUrl}/productos` },
        { "@type": "ListItem", position: 3, name: "Vasos Desechables en Nuevo Casas Grandes", item: `${siteUrl}${pagePath}` },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: business.name,
      url: siteUrl,
      logo: `${siteUrl}${business.logoPath}`,
      image: `${siteUrl}/images/vasos-desechables-cira.jpeg`,
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

export default function DisposableCupsLandingPage() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="about-hero" aria-labelledby="landing-title">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">Cira Comercial en Nuevo Casas Grandes</p>
            <h1 id="landing-title">Vasos desechables en Nuevo Casas Grandes</h1>
            <p>En Cira Comercial manejamos diferentes opciones de vasos desechables para hogares, comercios, restaurantes, negocios, eventos y otras necesidades locales.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#tipos-de-vasos">Ver tipos de vasos <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="about-hero-image"><Image src="/images/vasos-desechables-cira.jpeg" alt="Vasos desechables disponibles en Cira Comercial en Nuevo Casas Grandes, Chihuahua" fill priority sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 64px), 48vw" quality={80} /></div>
        </div>
      </section>

      <section className={`contact-methods section ${styles.compactSection}`} id="tipos-de-vasos" aria-labelledby="cup-types-title">
        <div className="container section-heading centered">
          <p className="eyebrow">Tipos de vasos</p>
          <h2 id="cup-types-title">Opciones para distintas bebidas y necesidades</h2>
          <p>Consulta con nuestro equipo la alternativa adecuada para servir bebidas, porciones o alimentos.</p>
        </div>
        <div className="container contact-methods-grid">
          {cupTypes.map((cupType) => <article className="contact-method-card" key={cupType}><span className="contact-method-icon" aria-hidden="true">✓</span><h3>{cupType}</h3><p>Consulta disponibilidad y presentaciones con nuestro equipo.</p></article>)}
        </div>
      </section>

      <section className={`coverage section ${styles.compactSection}`} aria-labelledby="sizes-title">
        <Reveal className="container coverage-content">
          <p className="eyebrow">Tamaños y presentaciones</p>
          <h2 id="sizes-title">Vasos para diferentes usos</h2>
          <p>Las necesidades cambian según la bebida, la porción y el tipo de servicio. Por eso puedes consultar vasos en distintas referencias y presentaciones para elegir una opción adecuada.</p>
          <p>Cira Comercial maneja vasos en diferentes tamaños, materiales y presentaciones para distintas bebidas, porciones y necesidades, además de opciones pequeñas para salsas o porciones cuando corresponda. Consulta disponibilidad y presentaciones con nuestro equipo.</p>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar opciones <span aria-hidden="true">→</span></a>
        </Reveal>
      </section>

      <section className={`contact-details-section section ${styles.compactSection}`} aria-labelledby="complements-title">
        <Reveal className="container contact-details-layout">
          <div>
            <p className="eyebrow">Tapas y complementos</p>
            <h2 id="complements-title">Completa tu servicio de bebidas</h2>
            <p>Además de vasos, puedes consultar tapas para vasos y portavasos para complementar tu compra según lo que necesitas.</p>
            <p>El surtido puede incluir referencias de Reyma, Dart, Jaguar y Bio Termo. Consulta disponibilidad y presentaciones con nuestro equipo.</p>
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar complementos <span aria-hidden="true">→</span></a>
          </div>
          <div className="contact-address-card"><h3>Atención personalizada</h3><p>Cuéntanos qué bebida o uso tienes en mente para ayudarte a revisar las opciones de vasos y complementos disponibles.</p><a className="contact-method-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <span aria-hidden="true">→</span></a></div>
        </Reveal>
      </section>

      <section className={`coverage section ${styles.compactSection}`} aria-labelledby="businesses-title">
        <Reveal className="container coverage-content">
          <p className="eyebrow">Para negocios y eventos</p>
          <h2 id="businesses-title">Vasos desechables para comercios, restaurantes y reuniones</h2>
          <p>Los vasos desechables pueden ser útiles para comercios, restaurantes, oficinas, eventos y necesidades del hogar. Nuestro equipo puede ayudarte a revisar opciones según el tipo de bebida o servicio.</p>
          <p>Si buscas vasos de plástico o vasos desechables para tu negocio, consulta disponibilidad y presentaciones con nuestro equipo.</p>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
        </Reveal>
      </section>

      <section className={`contact-details-section section ${styles.compactSection}`} aria-labelledby="local-title">
        <Reveal className="container contact-details-layout">
          <div>
            <p className="eyebrow">Atención local</p>
            <h2 id="local-title">Vasos desechables en Nuevo Casas Grandes, Chihuahua</h2>
            <p>Visita Cira Comercial o escríbenos para consultar vasos desechables, vasos de plástico, tapas y otros complementos para bebidas.</p>
            <p>Te ayudamos a revisar opciones para tu necesidad. Consulta disponibilidad y presentaciones con nuestro equipo antes de acudir.</p>
            <div className="hero-actions">
              <a className="button button-secondary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="contact-address-card"><h3>Cira Comercial</h3><address>{business.streetAddress}, C.P. {business.postalCode}, {business.city}, {business.state}.</address><Link className="contact-method-link" href="/contacto">Ver todos los datos de contacto <span aria-hidden="true">→</span></Link></div>
        </Reveal>
      </section>

      <div className={styles.compactMap}><LocationMap /></div>

      <section className={`faq section ${styles.compactSection}`} aria-labelledby="faq-title">
        <Reveal className="container faq-layout">
          <div><p className="eyebrow">Preguntas frecuentes</p><h2 id="faq-title">Resolvemos tus dudas sobre vasos desechables</h2><p>Escríbenos por WhatsApp si buscas una opción o presentación en particular.</p></div>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      <section className="final-cta" aria-labelledby="cta-title">
        <Reveal className="container final-cta-content">
          <p className="eyebrow">Atención directa</p>
          <h2 id="cta-title">¿Buscas vasos desechables en Nuevo Casas Grandes?</h2>
          <p>Consulta disponibilidad y presentaciones con nuestro equipo.</p>
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
