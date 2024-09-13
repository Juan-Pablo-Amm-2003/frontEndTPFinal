import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../Routes/apiService";
import { Product } from "../../interface/types";
import { useCart } from "../../components/cartContext";

interface CartItem {
  imagePath: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | undefined;
  description: string;
  stock: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]); 
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetchAllProducts();
        console.log("Fetched products:", result);
        setProducts(result.products);
        setFilteredProducts(result.products); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); 
  useEffect(() => {
    // Ordenar productos cuando `filteredProducts` o `sortBy` cambian
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortBy === "price") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setSortedProducts(sorted); // Usa sortedProducts para la renderización
  }, [filteredProducts, sortBy]); // Cambia las dependencias a filteredProducts y sortBy

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price), // Convertir de string a number
      quantity: 1,
      image: product.imagePath ?? "", // Usa una cadena vacía si imagePath es null
      description: product.description ?? "", // Usa una cadena vacía si description es null
      stock: product.stock,
      imagePath: product.imagePath ?? "", // Usa una cadena vacía si imagePath es null
    };

    addToCart(cartItem);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem); // Usa sortedProducts para la renderización
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage); // Usa sortedProducts para el cálculo total

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No products available.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <div className="flex justify-between mb-4">
        <select
          value={sortBy}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            {product.imagePath ? (
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600 mb-2">
              Price: ${product.price}
            </p>
            <p
              className={`text-sm ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
