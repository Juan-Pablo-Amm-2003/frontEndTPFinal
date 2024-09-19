import React, { createContext, useState, useContext, ReactNode } from "react";
import {jwtDecode} from "jwt-decode"; // Importación correcta de jwtDecode

// Define la interfaz del token decodificado
interface DecodedToken {
  role: string; // Cambia a role en lugar de isAdmin
}

interface AuthContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  React.useEffect(() => {
    const token = localStorage.getItem("authToken"); // Usamos "authToken"
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decodificamos el token
        setIsAdmin(decodedToken.role === "admin"); // Usamos role del token
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false); // Si hay error, no es admin
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
