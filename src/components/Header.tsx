import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import ProfileNavbar from "./navbar/ProfileNavbar";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const token = localStorage.getItem("authToken");

  const isAuthenticated = !!token; // Check if token exists

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
              aria-label="Logout"
            >
              Logout
            </button>
            {isAdmin && (
              <Link
                to="/adminHome"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
                aria-label="Admin Dashboard"
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
              aria-label="Login"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded transition"
              aria-label="Register"
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
