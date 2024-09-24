/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SalesPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../../Routes/apiRoutes";

const SalesPage: React.FC = () => {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(API_ROUTES.SALES.GET_ALL);
        setSales(response.data);
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
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Precio Total</th>
            <th className="px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
         {Array.isArray(sales) && sales.length > 0 ? (
            sales.map((sale: any) => (
                <tr key={sale.id}>
                <td className="border px-4 py-2">{sale.id}</td>
                <td className="border px-4 py-2">{sale.productName}</td>
                <td className="border px-4 py-2">{sale.quantity}</td>
                <td className="border px-4 py-2">{sale.totalPrice}</td>
                <td className="border px-4 py-2">
                    {new Date(sale.date).toLocaleDateString()}
                </td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan={5} className="text-center py-4">
                No sales found
                </td>
            </tr>
            )}

        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;