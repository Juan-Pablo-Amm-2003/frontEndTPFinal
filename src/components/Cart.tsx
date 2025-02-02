import React, { useEffect, useState } from "react";
import { useCart } from "../components/cartContext";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { registerSale } from "../Routes/apiService";

interface Usuario {
  id: string;
}

interface CargaCarrito {
  userId: string;
  cart: { name: string; price: number; quantity: number }[];
  total: number;
  email: string;
}

const Carrito: React.FC = () => {
  const [datosUsuario, setDatosUsuario] = useState<Usuario | null>(null);
  const { state, dispatch } = useCart();
  const cartItems = state.cartItems || [];
  const [confetti, setConfetti] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setDatosUsuario({ id: userId });
    } else {
      toast.error("No se encontraron datos de usuario en localStorage.");
    }
  }, []);

  const esAdmin = localStorage.getItem("isAdmin") === "true";
  if (esAdmin) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Acceso Denegado
        </h1>
        <p>Los administradores no tienen acceso a la lógica de compras.</p>
      </div>
    );
  }

  const manejarConfirmarCompra = async () => {
    if (!correo) {
      toast.error("Por favor, ingresa tu dirección de correo electrónico.");
      return;
    }

    setCargando(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error(
        "Token de autenticación no encontrado. Por favor, inicia sesión."
      );
      navigate("/login");
      return;
    }

    try {
      const tokenDecodificado = jwtDecode<{ exp: number }>(token);
      if (tokenDecodificado.exp * 1000 < Date.now()) {
        toast.error("El token ha expirado. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }

      if (!datosUsuario?.id) {
        toast.error("Datos de usuario no válidos.");
        setCargando(false);
        return;
      }

      if (cartItems.length === 0) {
        toast.error("El carrito está vacío. No se puede confirmar la compra.");
        setCargando(false);
        return;
      }

      const payload: CargaCarrito = {
        userId: datosUsuario.id,
        cart: cartItems.map(({ name, price, quantity }) => ({
          name,
          price: Number(price),
          quantity,
        })),
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        email: correo,
      };

      await registerSale(payload);
      toast.success("Compra confirmada exitosamente!");
      setConfetti(true);
      dispatch({ type: "CLEAR_CART" });
      setTimeout(() => {
        setConfetti(false);
        setCargando(false);
      }, 5000);
    } catch (error) {
      setCargando(false);
      toast.error(
        "Error al confirmar la compra: " +
          (error instanceof Error ? error.message : "Error desconocido.")
      );
    }
  };

  const eliminarDelCarrito = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", id });
    toast.success("Producto eliminado del carrito.");
  };

  const montoTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative p-8 bg-white rounded-lg shadow-lg border border-gray-200 max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Carrito de Compras
      </h1>
      <ul className="space-y-4 mb-6">
        {cartItems.length === 0 ? (
          <li className="text-center text-gray-500">
            Tu carrito está vacío 🛒
          </li>
        ) : (
          cartItems.map(({ id, name, price, quantity, imagePath }) => (
            <li
              key={id}
              className="flex justify-between items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm"
            >
              <div className="flex items-center">
                <img
                  src={imagePath}
                  alt={name}
                  className="w-16 h-16 object-cover rounded-lg mr-3"
                />
                <span className="font-semibold text-lg text-gray-700">
                  {name}
                </span>
              </div>
              <span className="text-gray-500">
                ${Number(price).toFixed(2)} x {quantity}
              </span>
              <button
                onClick={() => eliminarDelCarrito(id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Ingresa tu correo electrónico"
          required
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold text-gray-800">
          Total: ${montoTotal.toFixed(2)}
        </span>
        <button
          onClick={manejarConfirmarCompra}
          className="relative px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          Confirmar Compra
          {cargando && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
              <ClipLoader color="#0000ff" loading={cargando} size={50} />
            </div>
          )}
        </button>
      </div>
      <ToastContainer />
      {confetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
};

export default Carrito;
