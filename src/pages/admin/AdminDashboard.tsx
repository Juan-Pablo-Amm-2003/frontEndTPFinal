import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProductForm from "../../pages/admin/ProductForm";
import SalesPage from "../../pages/admin/salesPages";
import UserManagement from "../../pages/admin/componentes/UserManagement";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Sale, User } from "../../interface/types";
import axios from "axios";
import { API_ROUTES } from "../../Routes/apiRoutes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(API_ROUTES.SALES.GET_ALL);
        setSalesData(response.data.sales);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_ROUTES.USERS.GET_ALL);
        setUserData(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchSales();
    fetchUsers();
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-xl">
          No tienes permiso para ver esta página.
        </p>
      </div>
    );
  }

  const totalSales = salesData.length;
  const totalRevenue = salesData.reduce(
    (acc, sale) => acc + parseFloat(sale.total),
    0
  );

  const dataSales = {
    labels: ["Total Ventas", "Ingreso Total"],
    datasets: [
      {
        label: "Estadísticas de Ventas",
        data: [totalSales, totalRevenue],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const userLabels = userData.map((user) => user.registrationDate);
  const userCounts = userData.map((user) => user.count);

  const dataUsers = {
    labels: userLabels,
    datasets: [
      {
        label: "Usuarios Registrados",
        data: userCounts,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <p className="text-lg mb-8">Bienvenido, administrador.</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Gestión de Usuarios</h2>
        <UserManagement />
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Estadísticas del Sistema
        </h2>
        <p>Visualiza Estadísticas de Ventas</p>
        <Bar data={dataSales} />
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Estadísticas de Usuarios Registrados
        </h2>
        <p>
          Visualiza la cantidad de usuarios registrados a lo largo del tiempo
        </p>
        <Bar data={dataUsers} />
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Crear Producto</h2>
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <ProductForm />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Lista de Ventas</h2>
        <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
          <SalesPage />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
