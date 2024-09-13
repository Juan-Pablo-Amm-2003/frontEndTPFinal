import React, { createContext, useState, useContext, ReactNode } from "react";

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
    const token = localStorage.getItem("token");
    if (token) {
      // Decodifica el token y verifica el rol
      // (Utiliza una biblioteca como jwt-decode si es necesario)
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setIsAdmin(decodedToken.role === "admin"); // Asegúrate de que el rol sea verificado correctamente
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
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
