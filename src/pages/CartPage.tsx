import React from "react";
import Cart from "../components/Cart";

const CartPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      <Cart />
    </div>
  );
};

export default CartPage;
