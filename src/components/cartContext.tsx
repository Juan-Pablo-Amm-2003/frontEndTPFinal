import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { CartItem } from "../interface/types";

interface CartState {
  cartItems: CartItem[];
}

// Ensure id is of type number
type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: number } // Change id type to number
  | { type: "CLEAR_CART" };

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

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
      addToCart: (item: CartItem) => void;
    }
  | undefined
>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart }}>
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
