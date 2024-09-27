import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">My Store</h2>
          <p className="text-sm text-gray-400">
            © 2024 My Store. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
