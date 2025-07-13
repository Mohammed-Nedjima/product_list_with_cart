import { useContext, useEffect } from "react";
import { CartContext } from "../cartContexProvider";
import ConfirmationIcon from "../../assets/images/icon-order-confirmed.svg";
interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const Modal = ({ isOpen, onCloseModal }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCloseModal]);

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Modal must be used within a CartProvider");
  }

  const { cartItems, clearCart } = context;

  const handleClearCart = () => {
    onCloseModal();
    clearCart();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onCloseModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-xl  w-full max-w-xl grid gap-6 ">
        <img src={ConfirmationIcon} alt="" />

        <div>
          <h2 className="text-4xl font-extrabold  mb-2">Order Confirmed</h2>
          <p className="text-rose-500">We hope you enjoy your food!</p>
        </div>
        <ul className="bg-rose-50 px-6 py-2 rounded-lg">
          {[...cartItems.entries()]
            .filter((item) => item[1] > 0)
            .map((item) => (
              <li
                key={item[0].name}
                className="py-4 flex justify-between items-center border-b border-rose-100 last:border-b-0 "
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item[0].image.thumbnail}
                    alt={item[0].name}
                    className="rounded-lg w-16 h-16"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{item[0].name}</h3>
                    <p className="text-sm">
                      <span className="text-red font-semibold mr-4">
                        {item[1]}x
                      </span>
                      <span className="text-rose-400">
                        @ ${item[0].price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item[1] * item[0].price).toFixed(2)}
                </span>
              </li>
            ))}
          <div className="flex justify-between pt-6 pb-4">
            <span className="font-semibold text-md">Order Total</span>
            <span className="font-extrabold text-2xl">
              $
              {[...cartItems.entries()]
                .reduce((total, item) => total + item[1] * item[0].price, 0)
                .toFixed(2)}
            </span>
          </div>
        </ul>
        <button
          onClick={handleClearCart}
          className="bg-red hover:bg-red-dark font-semibold text-white cursor-pointer p-4 rounded-4xl transition-colors duration-300"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default Modal;
