// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import About from "./components/About";
import CartPage from "./pages/CartPage";
import Login from "./pages/login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/adminHome";
import { CartProvider } from "./components/cartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<AdminRoute />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  );
}

// Componente para proteger la ruta de administración
const AdminRoute: React.FC = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminDashboard /> : <Navigate to="/" />;
};

export default App;
