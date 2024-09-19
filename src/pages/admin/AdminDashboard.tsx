// src/pages/AdminDashboard.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, administrador.</p>

      <section>
        <h2>Gestión de Usuarios</h2>
        <p>Aquí puedes gestionar usuarios, cambiar roles, etc.</p>
        {/* Aquí puedes implementar una tabla para listar usuarios, botones de acción, etc. */}
      </section>

      <section>
        <h2>Estadísticas del Sistema</h2>
        <p>Visualiza estadísticas, uso del sistema, etc.</p>
        {/* Ejemplo de gráfica o tabla con estadísticas */}
      </section>
    </div>
  );
};

export default AdminDashboard;
