// src/components/Footer.tsx
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
          <h2 className="text-xl font-bold">My Store</h2>
        </div>

        <ul className="flex space-x-4 mb-4 md:mb-0">
          <li>
            <a href="#" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
