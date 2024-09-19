/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import ProfileNavbar from "./navbar/ProfileNavbar";
import { useAuth } from "../context/AuthContext";
import {jwtDecode} from "jwt-decode"; // Asegúrate de importar jwt-decode

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Cambiado a authToken
    navigate("/login");
  };

  // Function to check token validity (e.g., expiration)
  const isTokenValid = () => {
    if (!token) return false;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwtDecode(token); // Decodifica el token
      const exp = decodedToken.exp * 1000; // Convierte exp a milisegundos
      return exp > Date.now();
    } catch (error) {
      return false;
    }
  };

  const isAuthenticated = token && isTokenValid();

  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        My Store
      </Link>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
            >
              Logout
            </button>
            {isAdmin && (
              <Link
                to="/adminHome"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
              >
                Admin Dashboard
              </Link>
            )}
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded transition"
            >
              Register
            </Link>
          </>
        )}
        <ProfileNavbar />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
