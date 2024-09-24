import React, { createContext, useState, useContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  exp: number; // Add exp field for expiration
}

interface AuthContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  logout: () => void; // Provide logout method
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        // Check if token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          console.warn("Token has expired");
          localStorage.removeItem("authToken");
          setIsAdmin(false);
          return;
        }

        setIsAdmin(decodedToken.role === "admin");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
