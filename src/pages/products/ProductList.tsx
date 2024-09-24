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
        if (response && response) {
          setFilteredProducts(response);

        } else {
          setError("No products available");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
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
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label htmlFor="sortBy">Sort by: </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as keyof Product)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <ul>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Description: {product.description}</p>
              <p>Price: ${(parseFloat(product.price) || 0).toFixed(2)}</p>
              <img src={product.imagePath} alt={product.name} />
              <button
                onClick={() =>
                  addToCart({ ...product, quantity: 1 } as unknown as CartItem)
                }
              >
                Add to Cart
              </button>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>

      <div>
        {Array.from(
          { length: Math.ceil(filteredProducts.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
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
