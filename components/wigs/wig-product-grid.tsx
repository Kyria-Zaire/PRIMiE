import { WigCard } from "@/components/wigs/wig-card";
import { getFeaturedWigs } from "@/content/wigs";

/**
 * Grille produits sélection perruques — Server Component.
 * R1-R2 : 1 col → 2 cols dès lg → 3 cols dès xl ; gap positif args→cartes.
 */
export function WigProductGrid() {
  const products = getFeaturedWigs();

  return (
    <ul
      data-wig-products
      className="relative z-20 m-0 grid list-none grid-cols-1 items-stretch gap-3.5 p-0 sm:gap-4 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-5"
    >
      {products.map((product, index) => (
        <li key={product.id} className="min-w-0 h-full">
          <WigCard product={product} index={index as 0 | 1 | 2} />
        </li>
      ))}
    </ul>
  );
}
