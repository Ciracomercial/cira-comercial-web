export const siteUrl = "https://ciracomercial.com";

export const business = {
  name: "Cira Comercial",
  phone: "+526366882059",
  phoneDisplay: "(636) 688 2059",
  email: "ciracomercial2020@gmail.com",
  streetAddress: "Jesús Urueta 404, Col. Centro",
  postalCode: "31700",
  city: "Nuevo Casas Grandes",
  state: "Chihuahua",
  country: "MX",
  logoPath: "/assets/branding/cira-logo.png",
  hours: {
    weekdays: { display: "Lunes a viernes: 8:00 – 18:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    saturday: { display: "Sábado: 9:00 – 14:00", days: "Saturday", opens: "09:00", closes: "14:00" },
  },
} as const;

export const whatsappNumber = "5216366882059";

export const whatsappMessage =
  "Hola Cira Comercial, me interesa cotizar productos de limpieza.";

export const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
