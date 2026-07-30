import Link from "next/link";
import { whatsappUrl } from "../lib/site";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="eyebrow">Cira Comercial</p>
        <h1 id="not-found-title">Esta página no está disponible.</h1>
        <p>Regresa al inicio para conocer nuestros productos de limpieza y desechables.</p>
        <div className="not-found-actions">
          <Link className="button button-secondary" href="/">Volver al inicio</Link>
          <Link className="button button-secondary" href="/productos">Ver productos</Link>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>
  );
}
