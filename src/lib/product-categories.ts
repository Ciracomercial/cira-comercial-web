import { whatsappNumber } from "./site";

export type ProductCategory = {
  name: string;
  description: string;
  image: string;
};

export const productCategories: ProductCategory[] = [
  { name: "Albercas", description: "Productos para el mantenimiento, limpieza y tratamiento del agua de albercas.", image: "/assets/products/detergentes.jpeg" },
  { name: "Aromatizantes", description: "Soluciones para mantener espacios frescos y con aromas agradables.", image: "/assets/products/limpiadores-estante.jpeg" },
  { name: "Bolsas para basura", description: "Bolsas resistentes para residuos domésticos, comerciales e institucionales.", image: "/assets/products/surtido-tienda.jpeg" },
  { name: "Bolsas para empacar", description: "Opciones para proteger, envolver y transportar distintos tipos de productos.", image: "/assets/products/surtido-tienda.jpeg" },
  { name: "Cepillos y fibras", description: "Accesorios para tallar, remover suciedad y limpiar diferentes superficies.", image: "/assets/business/interior-tienda.jpg" },
  { name: "Químicos para el hogar", description: "Productos de limpieza para pisos, baños, cocina, ropa y superficies.", image: "/assets/products/jabon-mama.jpeg" },
  { name: "Desechables", description: "Artículos prácticos para alimentos, bebidas, eventos y uso diario.", image: "/assets/products/surtido-tienda.jpeg" },
  { name: "Utensilios de limpieza", description: "Herramientas esenciales para barrer, trapear, lavar y mantener espacios limpios.", image: "/assets/business/interior-tienda.jpg" },
  { name: "Cestos", description: "Recipientes para organizar, almacenar y depositar residuos.", image: "/assets/business/interior-tienda.jpg" },
  { name: "Papel institucional", description: "Papel higiénico, toallas y soluciones para baños de alto consumo.", image: "/assets/products/surtido-tienda.jpeg" },
  { name: "Jarciería", description: "Escobas, trapeadores, jaladores y artículos básicos para limpieza general.", image: "/assets/products/limpiadores-estante.jpeg" },
];

export const getCategoryWhatsappUrl = (categoryName: string) => {
  const connector = categoryName === "Albercas" ? "para" : "de";
  const message = `Hola, me gustaría recibir información sobre los productos ${connector} ${categoryName.toLocaleLowerCase("es-MX")}.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};
