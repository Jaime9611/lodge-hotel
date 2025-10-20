import { useEffect, useState, type FC, type ReactNode } from "react";
import { createContext, useContext } from "react";

import type { CabinCartItem } from "@models";

export interface CartContextState {
  cartItems: CabinCartItem[];
  count: number;
  addToCart: (item: CabinCartItem) => void;
  removeFromCart: (item: CabinCartItem) => void;
  clearCart: () => void;
}

// ------------------------------ CONTEXT --------------------------------------

const CartContext = createContext<CartContextState>({} as CartContextState);

// ------------------------------ PROVIDER --------------------------------------

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CabinCartItem[]>([]);

  const addToCart = (item: CabinCartItem) => {
    const isAlreadyInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (!isAlreadyInCart) {
      setCartItems([...cartItems, { ...item }]);
    }
  };

  const removeFromCart = (item: CabinCartItem) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const count = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, count, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ------------------------------ HOOK --------------------------------------
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context)
    throw new Error("the context was accessed outside the Context Provider");
  return context;
};
