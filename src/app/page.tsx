import type { Metadata } from "next";
import Image from "next/image";
import { FaqAccordion } from "../components/faq-accordion";
import { ProductCategoryGrid } from "../components/product-category-grid";
import { SiteHeader } from "../components/site-header";
import { HeroCarousel } from "../components/hero-carousel";
import { SiteFooter } from "../components/site-footer";
import { Reveal } from "../components/reveal";
import { LocationMap } from "../components/location-map";
import { business, googleMapsUrl, siteUrl, whatsappUrl } from "../lib/site";

export const metadata: Metadata = {
  title: { absolute: "Productos de limpieza en Nuevo Casas Grandes | Cira Comercial" },
  description: "Productos de limpieza para hogar, negocio e industria en Nuevo Casas Grandes. Cira Comercial ofrece jarciería, desechables y atención personalizada.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Productos de limpieza en Nuevo Casas Grandes | Cira Comercial",
    description: "Productos de limpieza para hogar, negocio e industria en Nuevo Casas Grandes. Cira Comercial ofrece jarciería, desechables y atención personalizada.",
    url: "/",
  },
  twitter: {
    title: "Productos de limpieza en Nuevo Casas Grandes | Cira Comercial",
    description: "Productos de limpieza para hogar, negocio e industria en Nuevo Casas Grandes. Cira Comercial ofrece jarciería, desechables y atención personalizada.",
  },
};

const solutions = [
  {
    icon: "⌂",
    title: "Para el hogar",
    text: "Todo para mantener tus espacios limpios, frescos y listos para disfrutar.",
    items: ["Limpieza para uso diario", "Presentaciones prácticas", "Atención en sucursal"],
  },
  {
    icon: "▦",
    title: "Para negocios",
    text: "Higiene confiable y suministros que ayudan a que tu operación no se detenga.",
    items: ["Compras por volumen", "Facturación disponible", "Pedidos recurrentes"],
  },
  {
    icon: "▥",
    title: "Para industria",
    text: "Soluciones de alto rendimiento para limpieza exigente y uso profesional.",
    items: ["Presentaciones de alto volumen", "Productos de alto rendimiento", "Cotizaciones personalizadas"],
  },
];

const faqs = [
  { question: "¿Realizan entregas a domicilio?", answer: "Sí. Realizamos entregas locales en Nuevo Casas Grandes y alrededores, con atención personalizada para hogares, negocios e industria." },
  { question: "¿Cuál es el monto mínimo de compra?", answer: "Para entregas a domicilio manejamos un pedido mínimo de $500 pesos. Si compras con frecuencia, podemos ayudarte con una solución personalizada." },
  { question: "¿Aceptan pagos en efectivo, transferencia o tarjeta?", answer: "Sí, aceptamos efectivo, transferencia bancaria, tarjeta de crédito o débito y pago en línea." },
  { question: "¿Emiten factura?", answer: "Sí. Emitimos factura electrónica (CFDI) para empresas, negocios y clientes que requieran comprobante fiscal." },
  { question: "¿Dónde se encuentra la sucursal?", answer: "Nuestra sucursal se encuentra en Jesús Urueta 404, Col. Centro, C.P. 31700, Nuevo Casas Grandes, Chihuahua." },
  { question: "¿Qué zonas cubren las entregas?", answer: "Realizamos entregas locales en Nuevo Casas Grandes y alrededores. Escríbenos para consultar la disponibilidad de entrega." },
  { question: "¿Manejan ventas por mayoreo?", answer: "Sí, atendemos compras al menudeo y mayoreo para hogares, negocios e industria." },
  { question: "¿Puedo solicitar productos que no aparecen en el catálogo?", answer: "Sí. Contáctanos por WhatsApp para consultar disponibilidad y encontrar una opción adecuada para tu necesidad." },
  { question: "¿Qué presentaciones manejan?", answer: "Las presentaciones varían según el producto. Puedes consultarlas en cada ficha o pedir orientación por WhatsApp." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <HeroCarousel />

      <section className="proof section" aria-labelledby="proof-title">
        <Reveal className="container proof-grid">
          <div>
            <p className="eyebrow">Confianza local</p>
            <h2 id="proof-title">Confianza local: calidad que se nota, atención que se recuerda.</h2>
            <p>Somos un proveedor cercano para quienes buscan productos funcionales y un servicio sin complicaciones.</p>
          </div>
          <div className="stats">
            <div><strong>4.9/5</strong><span>calificación en Google</span></div>
            <div><strong>11 categorías</strong><span>para hogar, negocio e industria</span></div>
            <div><strong>Atención local</strong><span>en Nuevo Casas Grandes</span></div>
          </div>
        </Reveal>
        <div className="container testimonial-grid">
          <Reveal delay={70}><article className="testimonial"><span className="stars">★★★★★</span><p>“Excelente. Productos con buena calidad y muy buen surtido.”</p><strong>Víctor Hugo Ochoa</strong><small>Cliente verificado en Google</small></article></Reveal>
          <Reveal delay={140}><article className="testimonial"><span className="stars">★★★★★</span><p>“Excelentes productos, muy buena calidad. Recomendados al 100%.”</p><strong>Javier Palacios</strong><small>Cliente verificado en Google</small></article></Reveal>
        </div>
      </section>

      <section className="solutions section" id="soluciones" aria-labelledby="solutions-title">
        <div className="container section-heading">
          <p className="eyebrow">Soluciones a tu medida</p>
          <h2 id="solutions-title">Soluciones para hogar, negocio e industria.</h2>
        </div>
        <div className="container solutions-grid">
          {solutions.map((solution, index) => (
            <Reveal key={solution.title} delay={index * 75}>
            <article className="solution-card">
              <span className="solution-icon" aria-hidden="true">{solution.icon}</span>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
              <ul>{solution.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="catalog section" id="categorias" aria-labelledby="categories-title">
        <Reveal className="container section-heading centered">
          <p className="eyebrow">Nuestro catálogo</p>
          <h2 id="categories-title">Categorías para cada necesidad.</h2>
          <p>Explora nuestras principales líneas de productos para hogar, negocio e industria.</p>
        </Reveal>
        <Reveal className="container" delay={70}><ProductCategoryGrid /></Reveal>
      </section>

      <section className="coverage section" id="cobertura" aria-labelledby="coverage-title">
        <Reveal className="container coverage-grid">
          <div className="coverage-content">
            <p className="eyebrow">Atención local</p>
            <h2 id="coverage-title">Productos de limpieza con atención local</h2>
            <p>En Cira Comercial atendemos hogares, oficinas, restaurantes, escuelas, talleres y negocios de Nuevo Casas Grandes. Contamos con productos de limpieza, papel, desechables, jarciería y soluciones para uso diario o compras por volumen.</p>
            <ul className="coverage-list"><li>Atención personalizada</li><li>Entregas locales</li><li>Facturación disponible</li></ul>
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
          </div>
          <div className="coverage-image"><Image src="/assets/business/interior-tienda.jpg" alt="Interior de la sucursal de Cira Comercial" fill sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 64px), 50vw" quality={80} /></div>
        </Reveal>
      </section>

      <section className="faq section" id="preguntas" aria-labelledby="faq-title">
        <Reveal className="container faq-layout">
          <div><p className="eyebrow">Resolvemos tus dudas</p><h2 id="faq-title">Preguntas frecuentes</h2><p>Si no encuentras lo que buscas, escríbenos. Te ayudamos a encontrar la mejor opción.</p></div>
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>

      <section className="final-cta">
        <Reveal className="container final-cta-content">
          <p className="eyebrow">De sucio a impecable</p>
          <h2>¿Listo para hacer tu pedido?</h2>
          <p>Escríbenos por WhatsApp y te ayudamos a revisar opciones, presentaciones y disponibilidad.</p>
          <a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar ahora <span aria-hidden="true">→</span></a>
        </Reveal>
      </section>

        <LocationMap />
      </main>
      <SiteFooter />
    </>
  );
}
