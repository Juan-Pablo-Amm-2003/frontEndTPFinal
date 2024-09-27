import React from "react";
import Carrito from "../components/Cart";

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg md:mt-20 sm:mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Carrito</h2>
        <Carrito />
      </div>
    </div>
  );
};

export default CartPage;
