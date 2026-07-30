import type { Metadata } from "next";
import { ContactForm } from "../../components/contact-form";
import { LocationMap } from "../../components/location-map";
import { Reveal } from "../../components/reveal";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { business, googleMapsUrl, whatsappUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Cira Comercial por WhatsApp, teléfono o correo. Visítanos en Nuevo Casas Grandes, Chihuahua.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-hero" aria-labelledby="contact-title"><div className="container contact-hero-content"><p className="eyebrow">Contacto</p><h1 id="contact-title">Estamos para ayudarte</h1><p>Cuéntanos qué producto necesitas y te ayudamos a encontrar una opción para tu hogar, negocio o institución.</p><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <span aria-hidden="true">→</span></a></div></section>

      <section className="contact-methods section" aria-labelledby="contact-methods-title"><div className="container section-heading centered"><p className="eyebrow">Canales de atención</p><h2 id="contact-methods-title">Elige la forma más cómoda de contactarnos</h2></div><div className="container contact-methods-grid">
        <article className="contact-method-card"><span className="contact-method-icon" aria-hidden="true">◌</span><h3>WhatsApp</h3><p>Consulta productos, presentaciones y disponibilidad.</p><a className="contact-method-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Enviar mensaje <span aria-hidden="true">→</span></a></article>
        <article className="contact-method-card"><span className="contact-method-icon" aria-hidden="true">⌕</span><h3>Teléfono</h3><p>{business.phoneDisplay}</p><a className="contact-method-link" href={`tel:${business.phone}`}>Llamar ahora <span aria-hidden="true">→</span></a></article>
        <article className="contact-method-card"><span className="contact-method-icon" aria-hidden="true">✉</span><h3>Correo</h3><p>{business.email}</p><a className="contact-method-link" href={`mailto:${business.email}`}>Enviar correo <span aria-hidden="true">→</span></a></article>
        <article className="contact-method-card"><span className="contact-method-icon" aria-hidden="true">⌖</span><h3>Ubicación</h3><p>Visítanos en Nuevo Casas Grandes, Chihuahua.</p><a className="contact-method-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">→</span></a></article>
      </div></section>

      <section className="contact-details-section section" aria-labelledby="contact-details-title"><Reveal className="container contact-details-layout"><div><p className="eyebrow">Horarios y ubicación</p><h2 id="contact-details-title">Horarios de atención</h2><dl className="contact-hours"><div><dt>Lunes a viernes</dt><dd>{business.hours.weekdays.display.replace("Lunes a viernes: ", "")}</dd></div><div><dt>Sábado</dt><dd>{business.hours.saturday.display.replace("Sábado: ", "")}</dd></div></dl></div><div className="contact-address-card"><h3>Dirección</h3><address>{business.streetAddress}, C.P. {business.postalCode}, {business.city}, {business.state}.</address><a className="button button-secondary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <span aria-hidden="true">↗</span></a></div></Reveal></section>
      <LocationMap />
      <section className="contact-form-section section" aria-labelledby="contact-form-title"><div className="container contact-form-layout"><div><p className="eyebrow">Solicitud rápida</p><h2 id="contact-form-title">Cuéntanos qué necesitas</h2><p>Completa los datos principales y abriremos WhatsApp con tu solicitud lista para enviar.</p></div><ContactForm /></div></section>
      <section className="contact-quick section" aria-labelledby="contact-quick-title"><Reveal className="container contact-quick-content"><div><p className="eyebrow">Antes de escribirnos</p><h2 id="contact-quick-title">Ayúdanos a orientarte mejor</h2></div><ul><li>Indica qué producto necesitas.</li><li>Menciona la presentación o cantidad aproximada.</li><li>Señala si requieres factura.</li><li>Consulta disponibilidad antes de acudir por productos específicos.</li></ul></Reveal></section>
      <section className="contact-cta"><Reveal className="container contact-cta-content"><p className="eyebrow">Atención directa</p><h2>¿Necesitas atención rápida?</h2><p>Escríbenos por WhatsApp y te ayudamos a revisar disponibilidad y opciones.</p><a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contactar por WhatsApp <span aria-hidden="true">→</span></a></Reveal></section>
      <SiteFooter />
    </main>
  );
}
