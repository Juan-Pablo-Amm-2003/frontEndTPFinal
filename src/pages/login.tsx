/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { loginUser } from "../Routes/apiService";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAdmin } = useAuth();


const handleLogin = async () => {
  if (!email || !password) {
    setError("Please fill in both email and password.");
    return;
  }

  setIsLoading(true);
  try {
    const response = await loginUser({ email, password });
    if (!response?.token) {
      throw new Error("Login failed: Missing token");
    }

    const { token, userId } = response;
    localStorage.setItem("authToken", token);
    localStorage.setItem("userId", String(userId));

    // Manejo de la decodificación con try-catch
    let decodedToken;
    try {
      decodedToken = jwtDecode<{
        id: number;
        username: string;
        isAdmin: boolean;
        exp: number;
      }>(token);
    } catch (error) {
      throw new Error("Failed to decode token");
    }

    // Verificar si el token ha expirado
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    if (decodedToken.exp < currentTime) {
      throw new Error("Token has expired");
    }

    // Guardar valores del token en localStorage (opcional) o en el contexto
    localStorage.setItem("username", decodedToken.username); // Guardar el username
    localStorage.setItem("isAdmin", String(decodedToken.isAdmin)); // Guardar si es admin
    localStorage.setItem("userId", String(decodedToken.id)); // Guardar ID del usuario

    // Si el token es válido y no ha expirado
    setIsAdmin(decodedToken.isAdmin);
    navigate(decodedToken.isAdmin ? "/adminHome" : "/");
  } catch (error) {
    if (error instanceof AxiosError) {
      setError(error.response?.data.message || "Login failed");
    } else if (error instanceof Error) {
      setError(error.message || "Login failed");
    } else {
      setError("An unknown error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Login
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
