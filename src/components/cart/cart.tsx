import { useContext } from "react";
import { CartContext } from "../cartContexProvider";
import EmptyIcon from "../../assets/images/illustration-empty-cart.svg";
import RemoveIcon from "../../assets/images/icon-remove-item.svg";
import CarbonIcon from "../../assets/images/icon-carbon-neutral.svg";
interface CartProps {
  onConfirmOrder: () => void;
}

const Cart = ({ onConfirmOrder }: CartProps) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Cart must be used within a CartProvider");
  }

  const { cartItems, removeProduct } = context;

  return (
    <div className="bg-white p-4 grid gap-4 rounded-xl h-fit  col-span-1 md:col-span-2 lg:col-span-1 ">
      <h2 className="text-xl text-red font-bold mb-4">
        Your Cart ({cartItems.size})
      </h2>
      {cartItems.size === 0 ? (
        <div className="flex justify-center items-center flex-col ">
          <img className="mb-4" src={EmptyIcon} alt="" />
          <p className="text-rose-500 text-sm">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div>
            {[...cartItems.entries()]
              .filter((item) => item[1] > 0)
              .map((item) => (
                <div
                  key={item[0].name}
                  className="flex justify-between items-center pb-4 border-b-2 border-rose-100 mb-4"
                >
                  <div>
                    <h3 className="text-md font-bold">{item[0].name}</h3>
                    <p>
                      <span className="text-red font-semibold mr-4">
                        {item[1]}x
                      </span>
                      <span className="text-rose-400 mr-2">
                        @ ${item[0].price.toFixed(2)}
                      </span>
                      <span className="text-rose-500 ">
                        ${(item[1] * item[0].price).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeProduct(item[0])}
                    className="w-6 h-6 cursor-pointer rounded-full border-2 border-rose-400 hover:border-rose-500 flex items-center justify-center group transition-all duration-200"
                  >
                    <img
                      src={RemoveIcon}
                      alt=""
                      className="transition-all duration-200 group-hover:brightness-0 group-hover:invert-[0.3] group-hover:sepia-[1] group-hover:saturate-[2] group-hover:hue-rotate-[320deg]"
                    />
                  </button>
                </div>
              ))}
          </div>
          <div className="flex justify-between items-center mt-4 mb-6">
            <span className="text-rose-500 ">Order Total</span>
            <span className="text-rose-900 font-extrabold text-2xl">
              $
              {[...cartItems.entries()]
                .reduce((total, item) => total + item[1] * item[0].price, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-center gap-2 bg-rose-50 p-4 rounded-lg mb-6">
            <img src={CarbonIcon} alt="" />
            <span className="text-rose-900 text-sm">
              This is a <b>carbon-neutral</b> delivery
            </span>
          </div>
          <button
            onClick={onConfirmOrder}
            className="bg-red hover:bg-red-dark font-semibold text-white cursor-pointer p-4 rounded-4xl transition-colors duration-300"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
