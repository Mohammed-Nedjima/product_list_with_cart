import React, { useState, useContext } from "react";
import { CartContext } from "./components/cartContexProvider";
import ProductGallery from "./components/productGallery/productGallery";
import Cart from "./components/cart/cart";
import Modal from "./components/modal/modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useContext(CartContext);

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto grid lg:grid-cols-3 gap-6 p-6 ">
      <ProductGallery />
      <Cart onConfirmOrder={handleConfirmOrder} />
      <Modal isOpen={isModalOpen} onCloseModal={handleCloseModal} />
    </div>
  );
}

export default App;
