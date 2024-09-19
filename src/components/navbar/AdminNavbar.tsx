// src/components/AdminNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaProductHunt,
  FaDollarSign,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/admin" className="text-xl font-bold">
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
            to="/admin/sales"
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

      <Link
        to="/logout"
        className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </Link>

      <div className="text-lg">
        <span className="font-semibold">Daily Revenue:</span> $1234.56
      </div>
    </nav>
  );
};

export default AdminNavbar;
