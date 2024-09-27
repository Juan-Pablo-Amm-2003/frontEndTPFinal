import React, { useEffect, useState } from "react";
import { API_ROUTES } from "../../../Routes/apiRoutes";

interface User {
  id: string;
  username: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.USERS.GET_ALL);
      if (!response.ok) throw new Error("Error fetching users");
      const data = await response.json();
      console.log("Datos de usuarios recibidos:", data);

      if (!Array.isArray(data.users)) {
        throw new Error("Data fetched is not an array");
      }

      setUsers(data.users);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(API_ROUTES.USERS.DELETE(id), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting user");
      fetchUsers();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando usuarios...</p>;
  }

  return (
    <div className="overflow-x-auto">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
