import { useContext } from "react";
import { CartContext, type Product } from "../cartContexProvider";
import Button from "./button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Product must be used within a CartProvider");
  }

  const { cartItems } = context;
  const productCount = cartItems.get(product) || 0;

  return (
    <div className="grid gap-3">
      <div className="flex flex-col items-center justify-center">
        <picture>
          <source media="(max-width: 767px)" srcSet={product.image.mobile} />
          <source
            media="(min-width: 768px) and (max-width: 1023px)"
            srcSet={product.image.tablet}
          />
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <img
            className={
              " border-3 rounded-xl " +
              (productCount > 0 ? "border-red" : "border-transparent")
            }
            src={product.image.thumbnail}
            alt={product.name}
          />
        </picture>
        <Button product={product} />
      </div>
      <div className="">
        <p className="text-sm text-rose-300">{product.category}</p>
        <h3 className="text-lg font-semibold text-rose-900">{product.name}</h3>
        <p className="text-xl font-bold text-red">{`$${product.price.toFixed(
          2
        )}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
