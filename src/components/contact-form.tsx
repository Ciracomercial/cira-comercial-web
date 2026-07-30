"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { whatsappNumber } from "../lib/site";

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  customerType: string;
  interest: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  customerType: "Hogar",
  interest: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const updateValue = (field: keyof ContactFormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ContactFormErrors = {};

    if (!values.name.trim()) nextErrors.name = "Ingresa tu nombre.";
    if (!values.phone.trim()) nextErrors.phone = "Ingresa un teléfono para contactarte.";
    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Ingresa un correo válido o déjalo vacío.";
    if (!values.message.trim()) nextErrors.message = "Cuéntanos qué necesitas.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const contactMessage = [
      `Hola, soy ${values.name.trim()}.`,
      "",
      `Tipo de cliente: ${values.customerType}`,
      `Teléfono: ${values.phone.trim()}`,
      `Correo: ${values.email.trim() || "No proporcionado"}`,
      `Producto o categoría: ${values.interest.trim() || "No especificado"}`,
      "",
      "Mensaje:",
      values.message.trim(),
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contactMessage)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <div className="contact-field"><label htmlFor="contact-name">Nombre <span aria-hidden="true">*</span></label><input id="contact-name" name="name" type="text" autoComplete="name" value={values.name} onChange={(event) => updateValue("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name && <p className="contact-field-error" id="contact-name-error" role="alert">{errors.name}</p>}</div>
        <div className="contact-field"><label htmlFor="contact-phone">Teléfono <span aria-hidden="true">*</span></label><input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />{errors.phone && <p className="contact-field-error" id="contact-phone-error" role="alert">{errors.phone}</p>}</div>
        <div className="contact-field"><label htmlFor="contact-email">Correo <span className="contact-optional">Opcional</span></label><input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email && <p className="contact-field-error" id="contact-email-error" role="alert">{errors.email}</p>}</div>
        <div className="contact-field"><label htmlFor="contact-customer-type">Tipo de cliente</label><select id="contact-customer-type" name="customerType" value={values.customerType} onChange={(event) => updateValue("customerType", event.target.value)}><option>Hogar</option><option>Negocio</option><option>Institución</option><option>Otro</option></select></div>
      </div>
      <div className="contact-field"><label htmlFor="contact-interest">Producto o categoría de interés</label><input id="contact-interest" name="interest" type="text" autoComplete="off" value={values.interest} onChange={(event) => updateValue("interest", event.target.value)} /></div>
      <div className="contact-field"><label htmlFor="contact-message">Mensaje <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" rows={5} value={values.message} onChange={(event) => updateValue("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />{errors.message && <p className="contact-field-error" id="contact-message-error" role="alert">{errors.message}</p>}</div>
      <p className="contact-form-note">Al enviar, abriremos WhatsApp con tu información. No almacenamos los datos del formulario. Al continuar, confirmas que has leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>.</p>
      <button className="button button-primary" type="submit">Enviar solicitud por WhatsApp <span aria-hidden="true">→</span></button>
    </form>
  );
}
