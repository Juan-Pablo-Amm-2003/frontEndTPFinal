import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, CartItem } from "../../interface/types";
import { fetchProductById } from "../../Routes/apiService";
import { useCart } from "../../components/cartContext";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const response = await fetchProductById(id);
          setProduct(response || null);
        } catch (error) {
          console.log(error)
          setError("Error fetching product");
        }
      } else {
        setError("Product ID is not valid");
      }
    };

    loadProduct();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-lg text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto my-8 p-6 mt-10 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
        <img
          src={product.imagePath}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4 transition-transform transform hover:scale-105"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {product.name}
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-2">
          <span className="font-semibold">Description:</span>{" "}
          {product.description}
        </p>
        <p className="text-xl md:text-2xl font-bold text-green-600 mb-4">
          Price: ${(parseFloat(product.price) || 0).toFixed(2)}
        </p>
        <p className="text-md text-gray-500 mb-2">
          <span className="font-semibold">Category ID:</span>{" "}
          {product.category_id}
        </p>
        <p className="text-md text-gray-500 mb-4">
          <span className="font-semibold">Stock:</span>{" "}
          {product.stock > 0 ? "Available" : "Out of Stock"}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ ...product, quantity: 1 } as unknown as CartItem);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
