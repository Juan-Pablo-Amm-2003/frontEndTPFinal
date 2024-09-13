import axios from "axios";

const API_URL = "http://localhost:3000/products"; 

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath?: string;
  category_id: number;
  stock: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);


    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      console.error("Unexpected response format:", response.data);
      return []; 
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
