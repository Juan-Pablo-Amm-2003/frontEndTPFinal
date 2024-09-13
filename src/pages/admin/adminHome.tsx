import React, { useState } from "react";
import ProductList from "../products/ProductList";
import ProductForm from "../products/ProductForm";
import SalesReport from "../admin/SalesReport";
import UserManagement from "../admin/userManagement";
import Footer from "../../components/Footer";
import AdminNavbar from "../../components/navbar/AdminNavbar"; 

const AdminHome: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("products");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section */}
      <AdminNavbar />

      {/* Main Content */}
      <main className="flex-1">
        <section className="py-8 bg-gray-50">
          {/* Navigation for Admin Sections */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveSection("products")}
              className={`px-4 py-2 rounded-md ${
                activeSection === "products"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Manage Products
            </button>
            <button
              onClick={() => setActiveSection("sales")}
              className={`px-4 py-2 rounded-md ${
                activeSection === "sales"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Sales Report
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`px-4 py-2 rounded-md ${
                activeSection === "users"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              User Management
            </button>
          </div>

          {/* Conditional Rendering based on Active Section */}
          {activeSection === "products" && (
            <>
              <ProductList />
              <ProductForm />
            </>
          )}
          {activeSection === "sales" && <SalesReport />}
          {activeSection === "users" && <UserManagement />}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminHome;
