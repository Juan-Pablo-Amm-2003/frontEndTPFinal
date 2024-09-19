import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Importa correctamente jwt-decode
import { loginUser } from "../Routes/apiService"; // Asegúrate de tener loginUser configurado correctamente
import { useAuth } from "../context/AuthContext"; // Asegúrate de importar useAuth desde el contexto

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setIsAdmin } = useAuth(); // Llama a setIsAdmin desde el contexto

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      const token = response.token;

      // Guardar el token en localStorage
      localStorage.setItem("authToken", token);

      // Decodificar el token para extraer información del usuario
      const decodedToken = jwtDecode<{ role: string }>(token);

      console.log("Usuario decodificado:", decodedToken);

      // Actualizar el contexto
      setIsAdmin(decodedToken.role === "admin");

      // Redirigir según el rol
      if (decodedToken.role === "admin") {
        navigate("/adminHome");
      } else {
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Login failed");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
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
          >
            Login
          </button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
