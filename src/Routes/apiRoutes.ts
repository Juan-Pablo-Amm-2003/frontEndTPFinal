const BASE_URL = "http://localhost:3000";

export const API_ROUTES = {
  PRODUCTS: {
    BASE: `${BASE_URL}/products`,
    GET_ALL: `${BASE_URL}/products`,
    GET_BY_ID: (id: string) => `${BASE_URL}/products/${id}`,
    GET_BY_NAME: (name: string) => `${BASE_URL}/products/name/${name}`,
    GET_BY_CATEGORY: (category: string) =>
      `${BASE_URL}/products/category/${category}`,
    GET_BY_PRICE: (price: string) => `${BASE_URL}/products/price/${price}`,
    CREATE: `${BASE_URL}/products/create`,
    UPDATE: (id: string) => `${BASE_URL}/products/${id}`,
    DELETE: (id: string) => `${BASE_URL}/products/${id}`,
  },
  USERS: {
    BASE: `${BASE_URL}/users`,
    GET_ALL: `${BASE_URL}/users`,
    GET_BY_ID: (id: string) => `${BASE_URL}/users/${id}`,
    CREATE: `${BASE_URL}/users`,
    UPDATE: (id: string) => `${BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${BASE_URL}/users/${id}`,
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
  },
  CATEGORIES: {
    BASE: `${BASE_URL}/categories`,
    GET_ALL: `${BASE_URL}/categories`,
    GET_BY_ID: (id: string) => `${BASE_URL}/categories/${id}`,
    CREATE: `${BASE_URL}/categories`,
    UPDATE: (id: string) => `${BASE_URL}/categories/${id}`,
    DELETE: (id: string) => `${BASE_URL}/categories/${id}`,
  },
  SALES: {
    BASE: `${BASE_URL}/sales`,
    GET_ALL: `${BASE_URL}/sales`,
    GET_BY_ID: (id: string) => `${BASE_URL}/sales/${id}`,
    REGISTER: `${BASE_URL}/sales/register-sale`,
  },
};
