import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Routes/apiService";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        username,
        password,
        email,
      });

      localStorage.setItem("token", response.token);
      toast.success("Registration successful!");
      navigate("/"); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
