import React from "react";
import ProductList from "./products/ProductList";
import ProductForm from "./products/ProductForm";
import Footer from "../components/Footer";


const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section */}
   

      {/* Main Content */}
      <main className="flex-1">
        <section className="py-8 bg-gray-50">
          {/* Product List */}
          <ProductList />
        </section>

        <section className="py-8">
          {/* Product Form */}
          <ProductForm />
        </section>
     
     
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
