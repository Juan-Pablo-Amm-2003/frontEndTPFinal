import axios, { AxiosResponse } from "axios";
import { API_ROUTES } from "../Routes/apiRoutes";
import { LoginResponse, RegisterResponse } from "../interface/types";

// Instancia de Axios
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set token in the headers for authenticated requests
const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Manejador de errores
const handleError = (error: unknown) => {
  console.error("Error in API call:", error);
  return { message: "An error occurred, please try again later." };
};

// Servicios de Productos
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Servicios de Ventas
export const registerSale = async (saleData: object) => {
  try {
    const response = await api.post(API_ROUTES.SALES.REGISTER, saleData);
    return response.data;
  } catch (error) {
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message);
  }
};

// Servicios de Usuarios

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(
      API_ROUTES.USERS.LOGIN,
      credentials
    );
    const { token } = response.data;
    localStorage.setItem("authToken", token); // Guardar token
    setAuthToken(token); // Configurar token para futuras peticiones
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Axios error during login:", error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    } else {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  }
};

export const registerUser = async (credentials: {
  email: string;
  password: string;
  username: string;
}): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await api.post(
      API_ROUTES.USERS.REGISTER,
      credentials
    );
    return response.data;
  } catch (error) {
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message);
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await api.get(API_ROUTES.USERS.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user data. Please try again later.");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get(API_ROUTES.USERS.GET_ALL);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
