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

// Añadir token al encabezado en las solicitudes protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejador de errores
const handleError = (error: unknown) => {
  console.error("Error in API call:", error);
  // Puedes retornar un mensaje de error más específico si es necesario
  return { message: "An error occurred, please try again later." };
};

// Servicios de Productos
export const fetchAllProducts = async () => {
  try {
    const response = await api.get(API_ROUTES.PRODUCTS.GET_ALL);
    return response.data;
  } catch (error) {
    return handleError(error); // Devuelve el mensaje de error
  }
};

// Servicios de Ventas
export const registerSale = async (saleData: object) => {
  try {
    const response = await api.post(API_ROUTES.SALES.REGISTER, saleData);
    return response.data;
  } catch (error) {
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message); // Lanza un error con el mensaje específico
  }
};

export const fetchSaleById = async (id: string) => {
  try {
    const response = await api.get(API_ROUTES.SALES.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching sale by ID:", error);
    // También puedes retornar un mensaje de error si es necesario
    throw new Error("Failed to fetch sale data. Please try again later.");
  }
};

export const fetchSalesData = async () => {
  try {
    const response = await api.get(API_ROUTES.SALES.GET_ALL);
    return response.data;
  } catch (error) {
    return handleError(error); // Devuelve el mensaje de error
  }
};

// Servicios de Usuarios
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(
      API_ROUTES.USERS.LOGIN, // Utiliza la ruta definida en API_ROUTES
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data.message || "An error occurred during login.";
      console.error("Axios error during login:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Unexpected error during login:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const registerUser = async (credentials: {
  username: string;
  password: string;
  email: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await api.post(
      API_ROUTES.USERS.REGISTER, // Utiliza la ruta definida en API_ROUTES
      credentials
    );
    return response.data;
  } catch (error) {
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message); // Lanza un error con el mensaje específico
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await api.get(API_ROUTES.USERS.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    // También puedes retornar un mensaje de error si es necesario
    throw new Error("Failed to fetch user data. Please try again later.");
  }
};

export const updateUser = async (id: string, updatedData: object) => {
  try {
    const response = await api.put(API_ROUTES.USERS.UPDATE(id), updatedData);
    return response.data;
  } catch (error) {
    const errorDetails = handleError(error);
    throw new Error(errorDetails.message); // Lanza un error con el mensaje específico
  }
};


// Servicios de Usuarios
export const fetchUsers = async () => {
  try {
    const response = await api.get(API_ROUTES.USERS.GET_ALL);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
