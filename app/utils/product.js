import api from "./axios";

/**
 * Retrieve products from backend API
 * Endpoint: GET /products
 */
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};

/**
 * Retrieve menu items from backend API
 * Endpoint: GET /menu
 */
export const getMenu = async (params = {}) => {
  const response = await api.get("/menu", { params });
  return response.data;
};

const productApi = {
  getProducts,
  getMenu,
};

export default productApi;
