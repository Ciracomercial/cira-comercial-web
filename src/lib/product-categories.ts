import { whatsappNumber } from "./site";

export type ProductCategory = {
  name: string;
  description: string;
  image: string;
};

export const productCategories: ProductCategory[] = [
  { name: "Albercas", description: "Productos para el mantenimiento, limpieza y tratamiento del agua de albercas.", image: "/assets/categories/albercas.svg" },
  { name: "Aromatizantes", description: "Soluciones para mantener espacios frescos y con aromas agradables.", image: "/assets/categories/aromatizantes.svg" },
  { name: "Bolsas para basura", description: "Bolsas resistentes para residuos domésticos, comerciales e institucionales.", image: "/assets/categories/bolsas-basura.svg" },
  { name: "Bolsas para empacar", description: "Opciones para proteger, envolver y transportar distintos tipos de productos.", image: "/assets/categories/bolsas-empacar.svg" },
  { name: "Cepillos y fibras", description: "Accesorios para tallar, remover suciedad y limpiar diferentes superficies.", image: "/assets/categories/cepillos-fibras.svg" },
  { name: "Químicos para el hogar", description: "Productos de limpieza para pisos, baños, cocina, ropa y superficies.", image: "/assets/categories/quimicos-hogar.svg" },
  { name: "Desechables", description: "Artículos prácticos para alimentos, bebidas, eventos y uso diario.", image: "/assets/categories/desechables.svg" },
  { name: "Utensilios de limpieza", description: "Herramientas esenciales para barrer, trapear, lavar y mantener espacios limpios.", image: "/assets/categories/utensilios-limpieza.svg" },
  { name: "Cestos", description: "Recipientes para organizar, almacenar y depositar residuos.", image: "/assets/categories/cestos.svg" },
  { name: "Papel institucional", description: "Papel higiénico, toallas y soluciones para baños de alto consumo.", image: "/assets/categories/papel-institucional.svg" },
  { name: "Jarciería", description: "Escobas, trapeadores, jaladores y artículos básicos para limpieza general.", image: "/assets/categories/jarcieria.svg" },
];

export const getCategoryWhatsappUrl = (categoryName: string) => {
  const connector = categoryName === "Albercas" ? "para" : "de";
  const message = `Hola, me gustaría recibir información sobre los productos ${connector} ${categoryName.toLocaleLowerCase("es-MX")}.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};
