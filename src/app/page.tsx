import Image from "next/image";
import { FaqAccordion } from "../components/faq-accordion";
import { Catalog } from "../components/catalog";
import { SiteHeader } from "../components/site-header";
import { Reveal } from "../components/reveal";
import { catalogProducts } from "../lib/products";
import { business, mapUrl, siteUrl, whatsappUrl } from "../lib/site";

const solutions = [
  {
    icon: "⌂",
    title: "Para el hogar",
    text: "Todo para mantener tus espacios limpios, frescos y listos para disfrutar.",
  },
  {
    icon: "▦",
    title: "Para negocios",
    text: "Higiene confiable y suministros que ayudan a que tu operación no se detenga.",
  },
  {
    icon: "▥",
    title: "Para industria",
    text: "Soluciones de alto rendimiento para limpieza exigente y uso profesional.",
  },
];

const faqs = [
  { question: "¿Realizan entregas a domicilio?", answer: "Sí. Realizamos entregas locales en Nuevo Casas Grandes y alrededores, con atención personalizada para hogares, negocios e industria." },
  { question: "¿Cuál es el monto mínimo de compra?", answer: "Para entregas a domicilio manejamos un pedido mínimo de $500 pesos. Si compras con frecuencia, podemos ayudarte con una solución personalizada." },
  { question: "¿Aceptan pagos en efectivo, transferencia o tarjeta?", answer: "Sí, aceptamos efectivo, transferencia bancaria, tarjeta de crédito o débito y pago en línea." },
  { question: "¿Emiten factura?", answer: "Sí. Emitimos factura electrónica (CFDI) para empresas, negocios y clientes que requieran comprobante fiscal." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${siteUrl}/#business`,
      name: business.name,
      url: siteUrl,
      logo: `${siteUrl}${business.logoPath}`,
      image: `${siteUrl}/assets/business/interior-tienda.jpg`,
      description: "Productos de limpieza, desechables y soluciones para hogar, negocio e industria en Nuevo Casas Grandes, Chihuahua.",
      telephone: business.phone,
      email: business.email,
      // Confirm this provisional price range before publishing.
      priceRange: "$",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: business.phone,
        contactType: "sales",
        availableLanguage: "Spanish",
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Productos de limpieza y desechables",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Productos para hogar" },
          { "@type": "OfferCatalog", name: "Productos para negocio e industria" },
          { "@type": "OfferCatalog", name: "Desengrasantes y productos institucionales de limpieza" },
        ],
      },
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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <SiteHeader />
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">Limpieza que sí rinde</p>
            <h1 id="hero-title">Productos de limpieza para <em>hogar, negocio e industria en Nuevo Casas Grandes.</em></h1>
            <p className="hero-description">
              Productos confiables, atención cercana y entregas locales en Nuevo Casas Grandes.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                Cotizar por WhatsApp <span aria-hidden="true">→</span>
              </a>
              <a className="button button-secondary" href="#categorias">Ver catálogo</a>
            </div>
            <p className="trust-line"><span>★</span> Atención local para compras de todos los tamaños</p>
          </Reveal>
          <Reveal className="hero-media" delay={80}>
            <Image src="/assets/business/interior-tienda.jpg" alt="Interior de Cira Comercial con productos de limpieza y desechables" fill priority sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="hero-badge"><strong>+500</strong><span>clientes atendidos</span></div>
          </Reveal>
        </div>
      </section>

      <section className="proof section" aria-labelledby="proof-title">
        <Reveal className="container proof-grid">
          <div>
            <p className="eyebrow">Confianza local</p>
            <h2 id="proof-title">Confianza local: calidad que se nota, atención que se recuerda.</h2>
            <p>Somos un proveedor cercano para quienes buscan productos funcionales y un servicio sin complicaciones.</p>
          </div>
          <div className="stats">
            <div><strong>4.9/5</strong><span>calificación en Google</span></div>
            <div><strong>+500</strong><span>clientes atendidos</span></div>
            <div><strong>Local</strong><span>entregas en NCG y alrededores</span></div>
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
              <ul><li>Atención personalizada</li><li>Productos de calidad</li><li>Entrega local disponible</li></ul>
            </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="catalog section" id="categorias" aria-labelledby="categories-title">
        <Reveal className="container section-heading centered">
          <p className="eyebrow">Nuestro catálogo</p>
          <h2 id="categories-title">Productos y categorías para cada necesidad.</h2>
          <p>Encuentra opciones para limpieza diaria, suministros institucionales y necesidades especializadas.</p>
        </Reveal>
        <Reveal className="container" delay={70}><Catalog products={catalogProducts} /></Reveal>
      </section>

      <section className="coverage section" id="cobertura" aria-labelledby="coverage-title">
        <Reveal className="container coverage-content">
          <p className="eyebrow">Atención local</p>
          <h2 id="coverage-title">Productos de limpieza y entregas locales en Nuevo Casas Grandes</h2>
          <p>En Cira Comercial atendemos necesidades de limpieza para el hogar, restaurantes, oficinas, escuelas, talleres, comercios e industria en Nuevo Casas Grandes y sus alrededores. Nuestro surtido está pensado para resolver desde la rutina diaria de una casa hasta el abastecimiento constante de espacios con mayor movimiento, con alternativas que se adaptan a cada tipo de uso.</p>
          <p>Encuentra detergentes, desengrasantes, papel, desechables y herramientas de limpieza para mantener áreas de trabajo, cocinas, baños, pisos y superficies en buenas condiciones. Si buscas productos institucionales o una opción práctica para tu negocio, te orientamos de forma clara para elegir lo que mejor se ajuste a tu necesidad, sin complicar el proceso de compra.</p>
          <p>Ofrecemos atención personalizada y entregas locales para que puedas organizar tus compras con mayor facilidad. También podemos ayudarte a reunir productos de distintas categorías en un mismo pedido, ya sea para reabastecer un espacio de trabajo o resolver una compra puntual, con respuesta cercana, práctica y enfocada en tus tiempos de operación. Escríbenos por WhatsApp para solicitar una cotización, consultar disponibilidad o coordinar la entrega de productos para tu hogar, negocio o actividad industrial.</p>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
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
          <h2>Haz tu pedido hoy y recibe productos de alto rendimiento.</h2>
          <p>Para tu hogar, oficina o industria. Estamos listos para atenderte.</p>
          <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
        </Reveal>
      </section>

      <footer id="contacto">
        <h2 className="sr-only">Contacto</h2>
        <div className="container footer-grid">
          <div className="footer-brand"><Image className="footer-logo" src="/assets/branding/cira-logo.png" alt="Cira Comercial" width={64} height={64} /><p>Proveedor confiable de productos de limpieza, higiene y desechables en Nuevo Casas Grandes.</p></div>
          <div><h3>Horario de atención</h3><p>{business.hours.weekdays.display}<br />{business.hours.saturday.display}</p></div>
          <div><h3>Contacto</h3>{mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer">{business.streetAddress}<br />C.P. {business.postalCode}, {business.city}, {business.state}</a> : <p>{business.streetAddress}<br />C.P. {business.postalCode}, {business.city}, {business.state}</p>}<a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
          <div className="footer-contact"><a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp<br /><strong>{business.phoneDisplay}</strong></a></div>
        </div>
        <div className="container copyright">© {new Date().getFullYear()} Cira Comercial. Todos los derechos reservados.</div>
      </footer>
    </main>
  );
}
