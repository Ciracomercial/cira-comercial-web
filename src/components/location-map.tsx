import { googleMapsUrl } from "../lib/site";

const mapsEmbedUrl = "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s30.4184513,-107.9102904";

export function LocationMap() {
  return (
    <section className="location-map section" aria-labelledby="location-map-title">
      <div className="container location-map-grid">
        <div className="location-map-copy">
          <p className="eyebrow">Nuestra ubicación</p>
          <h2 id="location-map-title">Visítanos</h2>
          <p>Encuentra productos de limpieza, jarciería y soluciones para tu hogar o negocio en nuestra sucursal de Nuevo Casas Grandes, Chihuahua.</p>
          <address className="location-map-address">Jesús Urueta 404, Col. Centro, C.P. 31700, Nuevo Casas Grandes, Chihuahua.</address>
          <div className="location-map-actions">
            <a className="button button-primary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">→</span></a>
            <a className="location-map-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="location-map-frame">
          <iframe src={mapsEmbedUrl} width="100%" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title="Ubicación de Cira Comercial" />
        </div>
      </div>
    </section>
  );
}
