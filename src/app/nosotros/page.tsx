import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "../../components/reveal";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { whatsappUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce Cira Comercial, proveedor local de productos de limpieza, jarciería, desechables y soluciones para hogar y negocio en Nuevo Casas Grandes.",
  alternates: { canonical: "/nosotros" },
};

const offerings = [
  { icon: "⌂", title: "Hogar", text: "Productos prácticos para mantener limpios y organizados los espacios de uso diario." },
  { icon: "▦", title: "Negocios", text: "Suministros para oficinas, comercios, restaurantes, escuelas y otros espacios con consumo constante." },
  { icon: "▥", title: "Institucional", text: "Presentaciones y soluciones para limpieza de mayor rendimiento y uso frecuente." },
  { icon: "↗", title: "Entrega local", text: "Apoyo para coordinar pedidos y entregas en Nuevo Casas Grandes y zonas cercanas, sujeto a disponibilidad." },
];

const reasons = [
  "Atención personalizada",
  "Variedad de categorías",
  "Presentaciones para distintas necesidades",
  "Compra para hogar y negocio",
  "Facturación disponible",
  "Servicio local",
];

const galleryImages = [
  { src: "/assets/business/interior-tienda.jpg", alt: "Interior de la sucursal de Cira Comercial con productos de limpieza y jarciería" },
  { src: "/assets/products/detergentes.jpeg", alt: "Detergentes y productos de limpieza en estante de Cira Comercial" },
  { src: "/assets/products/limpiadores-estante.jpeg", alt: "Productos de limpieza en distintas presentaciones dentro de Cira Comercial" },
  { src: "/assets/products/surtido-tienda.jpeg", alt: "Estante con artículos de limpieza y desechables en Cira Comercial" },
  { src: "/assets/products/jabon-mama.jpeg", alt: "Productos de limpieza para uso diario disponibles en Cira Comercial" },
  { src: "/assets/products/brillo-llantas.jpeg", alt: "Producto especializado para limpieza disponible en Cira Comercial" },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />

      <section className="about-hero" aria-labelledby="about-title">
        <div className="container about-hero-grid">
          <div className="about-hero-copy"><p className="eyebrow">Conócenos</p><h1 id="about-title">Productos de limpieza con atención cercana</h1><p>En Cira Comercial ayudamos a hogares, negocios e instituciones de Nuevo Casas Grandes a encontrar productos de limpieza, higiene, jarciería y desechables para sus necesidades diarias.</p><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contactar por WhatsApp <span aria-hidden="true">→</span></a></div>
          <div className="about-hero-image"><Image src="/assets/business/interior-tienda.jpg" alt="Interior de la sucursal de Cira Comercial" fill priority sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 64px), 48vw" quality={80} /></div>
        </div>
      </section>

      <section className="about-story section" aria-labelledby="about-story-title">
        <Reveal className="container about-story-grid">
          <div><p className="eyebrow">Quiénes somos</p><h2 id="about-story-title">Una opción local para tus necesidades de limpieza</h2></div>
          <div className="about-story-copy"><p>Cira Comercial es un negocio dedicado a la venta de productos de limpieza, higiene, jarciería, papel institucional, desechables y artículos para el mantenimiento de distintos espacios. Atendemos tanto compras para el hogar como necesidades de comercios, oficinas, escuelas, restaurantes, talleres e instituciones.</p><p>Buscamos que cada cliente encuentre una solución adecuada sin complicar su compra. Por eso ofrecemos atención personalizada, distintas presentaciones y apoyo para reunir productos de varias categorías en un mismo pedido.</p></div>
        </Reveal>
      </section>

      <section className="about-offerings section" aria-labelledby="about-offerings-title">
        <div className="container section-heading centered"><p className="eyebrow">Qué ofrecemos</p><h2 id="about-offerings-title">Soluciones para distintos espacios y necesidades</h2></div>
        <div className="container about-offerings-grid">{offerings.map((offering, index) => <Reveal key={offering.title} delay={index * 70}><article className="about-offering-card"><span className="solution-icon" aria-hidden="true">{offering.icon}</span><h3>{offering.title}</h3><p>{offering.text}</p></article></Reveal>)}</div>
      </section>

      <section className="about-why section" aria-labelledby="about-why-title">
        <Reveal className="container about-why-grid">
          <div><p className="eyebrow">Por qué elegirnos</p><h2 id="about-why-title">Una compra más simple, con respaldo local</h2><p>Te orientamos para encontrar los productos y presentaciones que mejor se adapten a lo que necesitas.</p></div>
          <div className="about-why-content"><ul>{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><div className="about-rating"><span aria-hidden="true">★★★★★</span><strong>4.9/5 en Google</strong></div></div>
        </Reveal>
      </section>

      <section className="about-gallery section" aria-labelledby="about-gallery-title">
        <div className="container section-heading"><p className="eyebrow">Nuestra sucursal</p><h2 id="about-gallery-title">Productos y atención en un mismo lugar</h2></div>
        <div className="container about-gallery-grid">{galleryImages.map((image, index) => <figure className={index === 0 ? "about-gallery-item is-featured" : "about-gallery-item"} key={image.src}><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 600px) calc(100vw - 32px), (max-width: 1100px) calc(66vw - 42px), 560px" : "(max-width: 600px) calc(50vw - 22px), (max-width: 1100px) calc(33vw - 30px), 280px"} quality={75} /></figure>)}</div>
      </section>

      <section className="about-cta"><Reveal className="container about-cta-content"><p className="eyebrow">Estamos para ayudarte</p><h2>¿Buscas un producto en particular?</h2><p>Escríbenos y te ayudamos a encontrar la opción más adecuada para tu hogar o negocio.</p><a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <span aria-hidden="true">→</span></a></Reveal></section>

      <SiteFooter />
    </main>
  );
}
