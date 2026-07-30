import Image from "next/image";
import { getCategoryWhatsappUrl, productCategories } from "../lib/product-categories";

export function ProductCategoryGrid() {
  return (
    <div className="product-category-grid">
      {productCategories.map((category) => (
        <a className="product-category-card" href={getCategoryWhatsappUrl(category.name)} target="_blank" rel="noopener noreferrer" aria-label={`Solicitar información sobre ${category.name} por WhatsApp`} key={category.name}>
          <span className="product-category-image"><Image src={category.image} alt={`Categoría ${category.name} de Cira Comercial`} fill sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(50vw - 38px), (max-width: 1200px) calc(33vw - 32px), 366px" quality={75} /></span>
          <span className="product-category-card-content"><strong>{category.name}</strong><span className="product-category-description">{category.description}</span></span>
        </a>
      ))}
    </div>
  );
}
