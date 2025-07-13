import { useContext } from "react";
import { CartContext, type Product } from "../cartContexProvider";
import addToCartIcon from "../../assets/images/icon-add-to-cart.svg";
import incrementQuantity from "../../assets/images/icon-increment-quantity.svg";
import decrementQuantity from "../../assets/images/icon-decrement-quantity.svg";

interface ButtonProps {
  product: Product;
}

const BUTTON_WIDTH = "w-40";
const BUTTON_MARGIN = "mt-[-22px]";

const Button = ({ product }: ButtonProps) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Button must be used within a CartProvider");
  }

  const {
    addProduct,
    incrementProductCount,
    decrementProductCount,
    cartItems
  } = context;

  const handleAddToCart = () => {
    addProduct(product);
  };
  const handleIncrement = () => {
    incrementProductCount(product);
  };
  const handleDecrement = () => {
    if ((cartItems.get(product) ?? 0) > 0) {
      decrementProductCount(product);
    }
  };

  if ((cartItems.get(product) ?? 0) === 0) {
    return (
      <button
        onClick={handleAddToCart}
        className={`${BUTTON_WIDTH} ${BUTTON_MARGIN} bg-white border-2 border-rose-400 py-2 px-4 flex justify-center items-center gap-2 rounded-4xl text-rose-900 font-semibold hover:text-red hover:border-red transition-colors duration-200`}
      >
        <img src={addToCartIcon} alt="Add to cart" />
        <span>Add to Cart</span>
      </button>
    );
  }
  return (
    <div className=" w-40 mt-[-22px] bg-red py-2 px-4 flex justify-center items-center gap-6 rounded-4xl text-white font-semibold transition-colors duration-200">
      <button
        onClick={handleDecrement}
        className="border-2 border-white rounded-full w-6 h-6 flex justify-center items-center hover:bg-white group transition-colors duration-200"
      >
        <img
          src={decrementQuantity}
          alt="decrement quantity"
          className="group-hover:brightness-0 group-hover:sepia group-hover:saturate-[2] group-hover:hue-rotate-[347deg] transition-all duration-200"
        />
      </button>
      <span className="min-w-[1.5rem] text-center">
        {cartItems.get(product) ?? 0}
      </span>
      <button
        onClick={handleIncrement}
        className=" border-2 border-white rounded-full w-6 h-6 flex justify-center items-center hover:bg-white group transition-colors duration-200"
      >
        <img
          src={incrementQuantity}
          alt="increment quantity"
          className="group-hover:brightness-0 group-hover:sepia group-hover:saturate-[2] group-hover:hue-rotate-[347deg] transition-all duration-200"
        />
      </button>
    </div>
  );
};

export default Button;
