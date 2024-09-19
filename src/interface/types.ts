/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export interface Product {
  id: number;
  name: string;
  price: number; // Ensure this is consistent
  imagePath?: string; // Adjust to string | null if needed
  description: string;
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string; // Agregamos la propiedad description
  stock: number;
}

// src/types.ts

// Definición de la respuesta de login
export interface LoginResponse {
  token: string;
  id: string;
  role: string;
  // Agrega otros campos según la respuesta de tu API
}

// Definición de la respuesta de registro
export interface RegisterResponse {
  token(arg0: string, token: any): unknown;
  id: string;
  username: string;
  email: string;
  // Agrega otros campos según la respuesta de tu API
}
