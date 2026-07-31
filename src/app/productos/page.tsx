import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { ProductCategoryGrid } from "../../components/product-category-grid";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Categorías de productos de limpieza",
  description: "Consulta las categorías disponibles en Cira Comercial: limpieza para el hogar, albercas, aromatizantes, bolsas, jarciería, desechables y más.",
  alternates: { canonical: "/productos" },
  openGraph: { url: "/productos" },
};

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="products-index section" aria-labelledby="products-title">
        <div className="container section-heading centered"><p className="eyebrow">Productos</p><h1 id="products-title">Categorías de productos de limpieza</h1><p>Explora soluciones para hogar, negocios e industria.</p></div>
        <div className="container"><ProductCategoryGrid /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
