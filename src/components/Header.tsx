import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import ProfileNavbar from "./navbar/ProfileNavbar";
import { useAuth } from "../context/AuthContext"; 

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth(); 
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Eliminar datos del usuario del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        My Store
      </Link>
      <div className="flex space-x-4">
        {token ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
            >
              Logout
            </button>
            {isAdmin && (
              <Link
                to="/admin/dashboard"
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
