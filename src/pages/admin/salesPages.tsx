import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../../Routes/apiRoutes";
import { Sale } from "../../interface/types";

const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(API_ROUTES.SALES.GET_ALL);
        console.log("Datos de ventas recibidos:", response.data);
        setSales(response.data.sales);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Lista de Ventas</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Usuario ID</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">PDF</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale: Sale) => (
              <tr key={sale.id}>
                <td className="border px-4 py-2">{sale.id}</td>
                <td className="border px-4 py-2">{sale.userId}</td>
                <td className="border px-4 py-2">{sale.total}</td>
                <td className="border px-4 py-2">
                  {sale.pdfUrl ? (
                    <a
                      href={sale.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver PDF
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No se encontraron ventas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;
