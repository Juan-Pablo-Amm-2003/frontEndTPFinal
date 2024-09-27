// cartContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { CartItem } from "../interface/types";

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cartItems: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, cartItems: [...state.cartItems, action.item] };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    case "CLEAR_CART":
      return { cartItems: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void; // Agregamos la función aquí
}>({
  state: initialState,
  dispatch: () => null,
  addToCart: () => {},
  removeFromCart: () => {}, // Implementación vacía por defecto
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
