// src/components/AdminNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaProductHunt,
  FaDollarSign,
  FaCog,
} from "react-icons/fa";

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/admin" className="text-xl font-bold hover:text-gray-300">
          Admin Dashboard
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/admin/stats"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaChartLine />
            <span>Statistics</span>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaProductHunt />
            <span>Products</span>
          </Link>
          <Link
            to="pages/admin/ProductForm"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaDollarSign />
            <span>Sales</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaCog />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      <div className="text-lg">
        <span className="font-semibold">Daily Revenue:</span> $1234.56
      </div>
    </nav>
  );
};

export default AdminNavbar;
