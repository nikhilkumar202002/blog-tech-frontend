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
 * Retrieve a single product by its slug
 * Endpoint: GET /products/:slug
 */
export const getProductBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Product slug is required");
  }
  const response = await api.get(`/products/${encodeURIComponent(slug)}`);
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
  getProductBySlug,
  getMenu,
};

export default productApi;
