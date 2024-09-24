import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductList from "../pages/products/ProductList";
import { fetchUsers } from "../Routes/apiService"; // Asegúrate de que fetchProducts no se importe aquí
import { useNavigate } from "react-router-dom";
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
        <h1 className="text-5xl font-extrabold">Bienvenido a la Tienda</h1>
        {username && (
          <h2 className="text-3xl mt-2 italic">Hola, {username}!</h2>
        )}
      </header>
      <main className="container mx-auto py-10 px-4">
        {!token && (
          <p className="text-center text-red-600 text-lg mb-8">
            Inicia sesión para acceder a todas las funciones.
          </p>
        )}
        <section className="my-10">
          <ProductList />
        </section>
        {isAdmin && (
          <div className="text-center mt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition-colors">
              Agregar Producto (solo admin)
            </button>
          </div>
        )}
      </main>

    </div>
  );
};

export default HomePage;
