/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Si el precio viene como string desde la API
  imagePath: string;
  category_id: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  count: any;
  id: string; // o number, según tu implementación
  username: string;
  email: string;
  registrationDate: string; // Formato ISO 8601, por ejemplo
  isActive: boolean; // Para indicar si el usuario está activo
  role: "admin" | "user"; // O cualquier otro rol que uses
}

export interface Sale {
  id: number;
  userId: number;
  snapshot: string; // Puedes parsear este JSON más tarde
  total: string; // O number si prefieres convertirlo
  pdfUrl: string | null;
}

// Definición de la respuesta de login
export interface LoginResponse {
  token: string;
  userId: number;
}

// Definición de la respuesta de registro
export interface RegisterResponse {
  token(arg0: string, token: any): unknown;
  id: string;
  username: string;
  email: string;
  // Agrega otros campos según la respuesta de tu API
}



// interface/types.ts
export interface CartItem {
  imagePath: string | undefined;
  image: string | undefined;
  id: number; 
  name: string;
  price: number;
  quantity: number;
}
