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
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

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
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-4xl font-bold">Bienvenido a la Tienda</h1>
        {user && <h2 className="text-2xl mt-2">Hola, {user.username}!</h2>}
      </header>
      <main className="container mx-auto py-8">
        {!token && (
          <p className="text-center text-red-500 text-lg mb-6">
            Inicia sesión para acceder a todas las funciones.
          </p>
        )}
        <section className="my-10">
          <ProductList />
        </section>
        {isAdmin && (
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Agregar Producto (solo admin)
            </button>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Mi Tienda - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default HomePage;
