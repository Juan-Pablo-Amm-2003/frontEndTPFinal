import React from "react";
import { useAuth } from "../context/AuthContext";

const HomePage: React.FC = () => {
  const { isAdmin } = useAuth();
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Bienvenido a la tienda</h1>

      {token ? (
        <button>Comprar</button>
      ) : (
        <p>Inicia sesión para comprar productos.</p>
      )}

      {isAdmin && (
        <div>
          <button>Agregar Producto (solo admin)</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
