/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from "axios";
import { API_ROUTES } from "../Routes/apiRoutes";
import { LoginResponse, RegisterResponse } from "../interface/types";
import { SetStateAction } from "react";

interface User {
  user: SetStateAction<User | null>;
  id: number;
  username: string;
  email: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler
const handleError = (error: unknown) => {
  console.error("API error:", error);
  return { message: "An error occurred, please try again later." };
};

// Products Service
export const fetchProducts = async () => {
  try {
    const { data } = await api.get(API_ROUTES.PRODUCTS.GET_ALL);
    console.log("Fetched products:", data.products);
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`); // Usa la instancia de Axios
    return response.data.product; // Accede al objeto product
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Lanza el error para que sea manejado en el componente
  }
};


// Sales Service
export const registerSale = async (saleData: object) => {
  try {
    const { data } = await api.post(API_ROUTES.SALES.REGISTER, saleData);
    return data;
  } catch (error) {
    throw new Error(handleError(error).message);
  }
};



// Users Service
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(
      API_ROUTES.USERS.LOGIN,
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message || error.message;
      console.error("Login error:", message);
      throw new Error(message);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unknown error occurred.");
    }
  }
};

export const registerUser = async (credentials: {
  email: string;
  password: string;
  username: string;
}): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post(API_ROUTES.USERS.REGISTER, credentials);
    return data;
  } catch (error) {
    throw new Error(handleError(error).message);
  }
};


export const fetchUserById = async (
  userId: string,
  token: string
): Promise<User | null> => {
  try {
    const response = await api.get(API_ROUTES.USERS.GET_BY_ID(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data); // Muestra la respuesta en consola antes de devolverla
    return response.data;
  } catch (error) {
    console.error("Fetch user by ID error:", error);
    return null;
  }
};



export const fetchUsers = async () => {
  try {
    const { data } = await api.get(API_ROUTES.USERS.GET_ALL);
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateUser = async (
  userId: string,
  updatedUser: User,
  token: string
) => {
  const response = await fetch(`${API_ROUTES.USERS.UPDATE(userId)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUser),
  });
  return response.json();
};

export const createProduct = async (
  productData: FormData
): Promise<AxiosResponse<unknown> | void> => {
  try {
    const response = await api.post(API_ROUTES.PRODUCTS.CREATE, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    const errorMessage = handleError(error).message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};


export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data; // Maneja la respuesta según sea necesario
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Error deleting product");
  }
};
