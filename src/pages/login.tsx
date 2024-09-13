import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Routes/apiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Llamada a la API para iniciar sesión
      const response = await loginUser({ email, password });

      // Verificar que `response` tenga `token`, `id` y `role`
      if (response.token && response.id && response.role) {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id.toString());
        localStorage.setItem("role", response.role); // Guardar el rol en localStorage

        // Mostrar mensaje de éxito
        toast.success("Login successful!");

        // Redirigir según el rol del usuario
        if (response.role === "admin") {
          navigate("admin/adminHome"); 
        } else {
          navigate("/}");
        }
      } else {
        // Mostrar mensaje de error si no se recibe token, id o role
        toast.error("Invalid response from server. Please try again.");
      }
    } catch (error) {
      // Manejo de errores y notificación al usuario
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "Login failed! Please check your credentials and try again."
        );
      } else if (error instanceof Error) {
        toast.error("An unexpected error occurred: " + error.message);
      } else {
        toast.error("An unknown error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
