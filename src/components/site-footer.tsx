import Image from "next/image";
import Link from "next/link";
import { business, mapUrl, whatsappUrl } from "../lib/site";

export function SiteFooter() {
  return (
    <footer id="contacto">
      <h2 className="sr-only">Contacto</h2>
      <div className="container footer-grid">
        <div className="footer-brand"><Image className="footer-logo" src="/assets/branding/cira-logo.png" alt="Cira Comercial" width={64} height={64} /><p>Proveedor confiable de productos de limpieza, higiene y desechables en Nuevo Casas Grandes.</p></div>
        <div><h3>Horario de atención</h3><p>{business.hours.weekdays.display}<br />{business.hours.saturday.display}</p></div>
        <div><h3>Contacto</h3>{mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer">{business.streetAddress}<br />C.P. {business.postalCode}, {business.city}, {business.state}</a> : <p>{business.streetAddress}<br />C.P. {business.postalCode}, {business.city}, {business.state}</p>}<a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
        <div className="footer-contact"><a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp<br /><strong>{business.phoneDisplay}</strong></a></div>
        <nav className="footer-nav" aria-label="Enlaces del pie de página"><h3>Enlaces</h3><Link href="/#inicio">Inicio</Link><Link href="/productos">Productos</Link><Link href="/#preguntas">Preguntas frecuentes</Link><Link href="/contacto">Contacto</Link><Link href="/aviso-de-privacidad">Aviso de Privacidad</Link></nav>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} Cira Comercial. Todos los derechos reservados.</div>
    </footer>
  );
}
