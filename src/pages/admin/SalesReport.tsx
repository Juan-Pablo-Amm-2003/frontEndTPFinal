import React, { useEffect, useState } from "react";
import { fetchSalesData } from "../../Routes/apiService"; // Asegúrate de que la ruta sea correcta

const SalesReport: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sales, setSales] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const result = await fetchSalesData();
        if (result.message) {
          setError(result.message);
        } else {
          setSales(result); // Asume que `result` es un array de ventas
        }
      } catch (error) {
        setError("Failed to fetch sales");
        console.error("Failed to fetch sales:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sale.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${sale.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sale.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReport;
