// Suponiendo que estás trabajando en un archivo como UsersReport.tsx

import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../Routes/apiService"; // Asegúrate de que la ruta sea correcta

const UsersReport: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const result = await fetchUsers();
        if (result.message) {
          setError(result.message);
        } else {
          setUsers(result); // Asume que `result` es un array de usuarios
        }
      } catch (error) {
        setError("Failed to fetch users");
        console.error("Failed to fetch users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Users Report</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              {/* Añade más columnas si es necesario */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                {/* Añade más celdas si es necesario */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersReport;
