import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductList from "../pages/products/ProductList";
import { fetchUsers } from "../Routes/apiService"; 
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  username: string;
}

const HomePage: React.FC = () => {
  const { isAdmin } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  const validateToken = (token: string) => {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    return decodedToken.exp * 1000 > Date.now();
  };

  useEffect(() => {
    if (token && validateToken(token)) {
      fetchUsers()
        .then((fetchedUser: User) => {
          setUser(fetchedUser);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Bienvenido a la Tienda
        </h1>
        {username && (
          <h2 className="text-xl md:text-3xl mt-2 italic">Hola, {username}!</h2>
        )}
      </header>
      <main className="container mx-auto py-10 px-4">
        {!token && (
          <p className="text-center text-red-600 text-base md:text-lg mb-8">
            Inicia sesión para acceder a todas las funciones.
          </p>
        )}
        <section className="my-10">
          <ProductList />
        </section>
        {isAdmin && (
          <div className="text-center mt-8">
            <Link
              to="/adminHome"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
              aria-label="Admin Dashboard"
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
