import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../components/cartContext";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

interface UserData {
  id: number;
  email: string;
  // Agrega otros campos según sea necesario
}

const getUserData = (): UserData | null => {
  try {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      throw new Error("Datos de usuario no encontrados en localStorage");
    }

    const parsedData = JSON.parse(userDataString);
    if (!parsedData.user) {
      throw new Error("Datos de usuario no encontrados en el objeto parseado");
    }

    const userData = parsedData.user as UserData;
    if (!userData.id || !userData.email) {
      throw new Error("Datos de usuario faltantes");
    }

    return userData;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    toast.error(
      "Los datos de usuario no son válidos o están incompletos. Por favor, inicia sesión nuevamente."
    );
    return null;
  }
};

const Cart = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { cartItems } = useCart();
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = getUserData();
    if (data) {
      setUserData(data);
    }
  }, []);

  const handleConfirmPurchase = async () => {
    if (!userData) {
      console.error("Datos de usuario faltantes");
      toast.error("No se pueden confirmar la compra sin datos de usuario.");
      return;
    }

    setLoading(true); // Muestra el spinner de carga

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token de autenticación no encontrado");
      }

      const payload = {
        userId: userData.id,
        cart: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        email: userData.email,
      };

      const response = await axios.post(
        "http://localhost:3000/sales/register-sale",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Compra confirmada para el usuario:", userData);
      console.log("Respuesta del servidor:", response.data);
      toast.success("Compra confirmada exitosamente!");
      setConfetti(true);

      // Detener el spinner y el confeti después de 5 segundos
      setTimeout(() => {
        setConfetti(false);
        setLoading(false);
      }, 5000);
    } catch (error) {
      setLoading(false); // Oculta el spinner de carga en caso de error
      if (axios.isAxiosError(error)) {
        console.error(
          "Error al confirmar la compra:",
          error.response?.data || error.message
        );
        toast.error(
          `Error al confirmar la compra: ${
            error.response?.data || error.message
          }`
        );
      } else if (error instanceof Error) {
        console.error("Error al confirmar la compra:", error.message);
        toast.error(`Error al confirmar la compra: ${error.message}`);
      } else {
        console.error("Error desconocido al confirmar la compra:", error);
        toast.error("Error desconocido al confirmar la compra.");
      }
    }
  };

  return (
    <div className="relative p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Carrito de Compras
      </h1>
      <ul className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm"
          >
            <span className="font-semibold text-lg text-gray-700">
              {item.name}
            </span>
            <span className="text-gray-500">
              ${item.price.toFixed(2)} x {item.quantity}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-gray-800">
          Total: $
          {cartItems
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
        <button
          onClick={handleConfirmPurchase}
          className="relative px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          Confirmar Compra
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
              <ClipLoader color="#0000ff" loading={loading} size={50} />
            </div>
          )}
        </button>
      </div>
      <ToastContainer />
      {confetti && (
        <div className="absolute inset-0 z-10">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </div>
  );
};

export default Cart;
