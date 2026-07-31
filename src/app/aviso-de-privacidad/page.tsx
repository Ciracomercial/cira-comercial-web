import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { business, privacyNoticeLastUpdated } from "../../lib/site";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Consulta cómo Cira Comercial utiliza y protege los datos proporcionados a través de su sitio web.",
  alternates: { canonical: "/aviso-de-privacidad" },
  openGraph: { url: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacyNoticePage() {
  return (
    <main>
      <SiteHeader />
      <article className="privacy-notice">
        <header className="privacy-hero"><div className="container privacy-reading"><p className="eyebrow">Privacidad</p><h1>Aviso de Privacidad</h1><p>En Cira Comercial reconocemos la importancia de proteger tus datos personales. En este aviso te explicamos qué información podemos recopilar, para qué la utilizamos y cómo puedes ejercer tus derechos.</p><p className="privacy-updated">Última actualización: {privacyNoticeLastUpdated}</p></div></header>

        <div className="container privacy-reading privacy-content">
          <section aria-labelledby="privacy-responsible"><h2 id="privacy-responsible">Responsable del tratamiento de los datos personales</h2>{/* TODO: confirmar nombre legal completo del responsable. */}<p>Cira Comercial, con domicilio en {business.streetAddress}, C.P. {business.postalCode}, {business.city}, {business.state}, es responsable del tratamiento de los datos personales que se recaben a través de este sitio web.</p></section>

          <section aria-labelledby="privacy-data"><h2 id="privacy-data">Datos que pueden recabarse</h2><p>De acuerdo con la información que decidas proporcionar mediante el formulario de Contacto, podemos recabar:</p><ul><li>Nombre.</li><li>Número telefónico.</li><li>Correo electrónico, cuando decidas proporcionarlo.</li><li>Tipo de cliente.</li><li>Producto o categoría de interés.</li><li>Contenido del mensaje enviado.</li></ul><p>Cira Comercial no solicita datos personales sensibles a través de este sitio web.</p></section>

          <section aria-labelledby="privacy-purposes"><h2 id="privacy-purposes">¿Para qué utilizamos tus datos?</h2><p>Los datos se utilizan únicamente para finalidades relacionadas con tu solicitud:</p><ul><li>Responder consultas.</li><li>Proporcionar información sobre productos y presentaciones.</li><li>Revisar disponibilidad.</li><li>Preparar cotizaciones solicitadas.</li><li>Dar seguimiento a solicitudes.</li><li>Coordinar comunicación por teléfono, correo o WhatsApp.</li><li>Atender solicitudes de facturación cuando el cliente lo requiera.</li></ul><p>El sitio no cuenta actualmente con una función de promociones o campañas. Si en el futuro se incorpora, este aviso se actualizará antes de utilizar los datos con esa finalidad.</p></section>

          <section aria-labelledby="privacy-form"><h2 id="privacy-form">Formulario y WhatsApp</h2><p>Cuando utilizas el formulario de contacto, la información capturada puede utilizarse para generar un mensaje dirigido a WhatsApp. Al continuar, el tratamiento de la información dentro de dicha plataforma también estará sujeto a sus propios términos y políticas de privacidad.</p><p>El formulario no almacena la información capturada en el servidor del sitio.</p></section>

          <section aria-labelledby="privacy-third-parties"><h2 id="privacy-third-parties">Servicios de terceros</h2><p>El sitio incluye enlaces a WhatsApp y un mapa integrado de Google Maps. Al utilizar enlaces o servicios externos, puedes ser dirigido a plataformas administradas por terceros. El tratamiento de datos realizado dentro de dichas plataformas se rige por sus propios avisos y políticas.</p></section>

          <section aria-labelledby="privacy-cookies"><h2 id="privacy-cookies">Cookies y tecnologías</h2><p>Actualmente no se han identificado herramientas de analítica, píxeles publicitarios, almacenamiento local o cookies de seguimiento en este sitio. El sitio puede utilizar tecnologías técnicas necesarias para su funcionamiento. En caso de incorporar herramientas analíticas o publicitarias, este aviso será actualizado y se solicitará el consentimiento correspondiente cuando sea necesario.</p></section>

          <section aria-labelledby="privacy-rights"><h2 id="privacy-rights">Tus derechos sobre los datos personales</h2><p>Puedes solicitar acceso, rectificación, cancelación, oposición, limitación del uso o divulgación de tus datos, así como la revocación del consentimiento cuando corresponda.</p>{/* TODO: confirmar correo responsable de privacidad y procedimiento ARCO. */}<p>Para solicitar información sobre el tratamiento de tus datos personales, comunícate mediante los datos disponibles en nuestra página de <Link href="/contacto">Contacto</Link>.</p></section>

          <section aria-labelledby="privacy-request"><h2 id="privacy-request">Contenido de la solicitud</h2><p>Para atender una solicitud, puede ser necesario incluir:</p><ul><li>Nombre del titular.</li><li>Medio para recibir respuesta.</li><li>Descripción clara del derecho que desea ejercer.</li><li>Información que permita localizar los datos.</li><li>Documentación necesaria para acreditar identidad, cuando corresponda.</li></ul><p>No envíes documentos de identidad mediante el formulario del sitio mientras no exista un procedimiento seguro para recibirlos.</p></section>

          <section aria-labelledby="privacy-security"><h2 id="privacy-security">Conservación y seguridad</h2><p>Los datos serán conservados únicamente durante el tiempo necesario para atender la solicitud y cumplir las obligaciones aplicables.</p><p>Cira Comercial aplica medidas razonables de seguridad para reducir riesgos de pérdida, alteración, acceso o uso no autorizado. Sin embargo, ningún sistema de transmisión o almacenamiento electrónico puede garantizar seguridad absoluta.</p></section>

          <section aria-labelledby="privacy-changes"><h2 id="privacy-changes">Cambios al aviso de privacidad</h2><p>Este aviso podrá modificarse para reflejar cambios legales, operativos o en los servicios del sitio. La versión vigente estará disponible permanentemente en esta misma página.</p><p className="privacy-updated">Última actualización: {privacyNoticeLastUpdated}</p></section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
