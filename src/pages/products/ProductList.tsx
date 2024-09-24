import React, { useEffect, useState } from "react";
import { Product, CartItem } from "../../interface/types";
import { useCart } from "../../components/cartContext";
import { fetchProducts } from "../../Routes/apiService";

const ProductList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<keyof Product>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        if (response) {
          setFilteredProducts(response);
        } else {
          setError("No products available");
        }
      } catch {
        setError("Error fetching products");
      }
    };

    loadProducts();
  }, []);

  const handleSort = (sortField: keyof Product) => {
    setSortBy(sortField);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const aValue =
        sortField === "price"
          ? parseFloat(a[sortField])
          : a[sortField].toString();
      const bValue =
        sortField === "price"
          ? parseFloat(b[sortField])
          : b[sortField].toString();

      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });
    setFilteredProducts(sortedProducts);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) {
    return <div className="text-red-500 text-lg text-center">{error}</div>;
  }

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-4">Product List</h1>
      <div className="mb-4 text-center">
        <label htmlFor="sortBy" className="mr-2">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as keyof Product)}
          className="border border-gray-300 rounded-lg px-3 py-1"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 mb-2">
                Description: {product.description}
              </p>
              <p className="text-lg font-bold mb-2">
                Price: ${(parseFloat(product.price) || 0).toFixed(2)}
              </p>
              <button
                onClick={() =>
                  addToCart({ ...product, quantity: 1 } as unknown as CartItem)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
              className={`py-2 px-4 rounded-lg font-semibold ${
                index + 1 === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
