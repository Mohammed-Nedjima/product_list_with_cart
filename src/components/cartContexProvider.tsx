import { createContext, type ReactNode, useState } from "react";

export type Product = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

interface CartContextType {
  cartItems: Map<Product, number>;
  incrementProductCount: (product: Product) => void;
  decrementProductCount: (product: Product) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Map<Product, number>>(new Map());

  // Function to increment product count in cart
  const incrementProductCount = (product: Product) => {
    setCartItems((prevItems) =>
      new Map(prevItems).set(product, (prevItems.get(product) || 0) + 1)
    );
  };

  // Function to decrement product count in cart
  const decrementProductCount = (product: Product) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      const currentCount = newItems.get(product) || 0;

      if (currentCount <= 1) {
        newItems.delete(product);
      } else {
        newItems.set(product, currentCount - 1);
      }

      return newItems;
    });
  };

  // Function to add a product to the cart
  const addProduct = (product: Product) => {
    setCartItems((prevItems) => new Map(prevItems).set(product, 1));
  };

  const removeProduct = (product: Product) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      newItems.delete(product);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems(new Map());
  };

  // Context value object
  const contextValue: CartContextType = {
    cartItems,
    incrementProductCount,
    decrementProductCount,
    addProduct,
    removeProduct,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
