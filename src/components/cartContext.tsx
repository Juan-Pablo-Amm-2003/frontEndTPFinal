// cartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "../interface/types"; // Define bien la interfaz CartItem

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  // Otras funciones como eliminar del carrito pueden agregarse aquí
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
