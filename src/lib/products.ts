import products from "../../data/products.json";

export type CatalogFilter =
  | "Todos"
  | "Hogar"
  | "Industria"
  | "Automotriz"
  | "Papel y desechables"
  | "Herramientas";

export type CatalogProduct = {
  category: Exclude<CatalogFilter, "Todos">;
  title: string;
  description: string;
  image: string;
  features: string[];
};

type CatalogSelection = {
  slug: string;
  category: CatalogProduct["category"];
  image: string;
};

// These selections preserve the six-card presentation while their content is
// read from the real product catalog.
const catalogSelections: CatalogSelection[] = [
  { slug: "brillo-para-llantas", category: "Automotriz", image: "/assets/products/brillo-llantas.jpeg" },
  { slug: "multiusos", category: "Hogar", image: "/assets/products/limpiadores-estante.jpeg" },
  { slug: "polipapel", category: "Papel y desechables", image: "/assets/products/surtido-tienda.jpeg" },
  { slug: "jabon-para-ropa", category: "Hogar", image: "/assets/products/jabon-mama.jpeg" },
  { slug: "jalador-agua-ala", category: "Herramientas", image: "/assets/business/interior-tienda.jpg" },
  { slug: "desengrasante-industrial", category: "Industria", image: "/assets/products/detergentes.jpeg" },
];

const productsBySlug = new Map(products.map((product) => [product.slug, product]));

export const catalogProducts: CatalogProduct[] = catalogSelections.map((selection) => {
  const product = productsBySlug.get(selection.slug);

  if (!product) {
    throw new Error(`No se encontró el producto "${selection.slug}" en data/products.json.`);
  }

  return {
    category: selection.category,
    title: product.name,
    description: product.shortDescription,
    image: selection.image,
    features: product.benefits.slice(0, 3),
  };
});
