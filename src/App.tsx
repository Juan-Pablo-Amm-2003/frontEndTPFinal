import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNavbar from "./components/navbar/AdminNavbar";
import ProfilePage from "./pages/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componente para rutas privadas (solo usuarios autenticados)
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Componente para rutas de administrador (solo administradores)
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Si no es administrador, redirigir al home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/adminHome"
              element={
                <AdminRoute>
                  <AdminNavbar />
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to="/" />} // Redirigir cualquier ruta desconocida al HomePage
            />
          </Routes>
        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
