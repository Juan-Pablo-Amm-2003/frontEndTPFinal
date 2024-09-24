// Navbar.tsx
import React, { useState } from "react";
import { useCart } from "../cartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart(); // Get the state
  const cartItems = state.cartItems || []; // Ensure cartItems is defined

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <nav className="relative bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-semibold tracking-wide">
          MyShop
        </Link>
        <div className="relative">
          <button
            onClick={toggleCart}
            className="relative bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 flex items-center"
          >
            <FiShoppingCart className="mr-2 text-lg" />
            <span>Cart</span>
            <FiChevronDown
              className={`ml-2 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full right-0 mt-2 w-80 bg-white text-black p-4 shadow-lg rounded-lg"
              >
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your cart is empty 🛒
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="ml-3">
                          <span className="block text-gray-700 font-semibold">
                            {item.name}
                          </span>
                          <span className="text-gray-500">
                            ${item.price} x {item.quantity}
                          </span>
                        </div>
                      </li>
                    ))}
                    <p className="text-right text-lg font-bold text-gray-800">
                      Total: $
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </ul>
                )}
                <div className="flex justify-between mt-6">
                  <Link
                    to="/cart"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                  >
                    View Cart
                  </Link>
                  <button
                    onClick={toggleCart}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
