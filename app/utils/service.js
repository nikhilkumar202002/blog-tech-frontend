import api from "./axios";

/**
 * Send contact form submission to backend API
 * Endpoint: POST /contact
 * Payload: { name, email, phone, subject, message }
 */
export const sendContactMessage = async (data) => {
  const response = await api.post("/contact", data);
  return response.data;
};

/**
 * Retrieve published services from backend API
 * Endpoint: GET /services
 * Response: { success, message, data: [...], meta: { current_page, last_page, per_page, total } }
 */
export const getServices = async (params = {}) => {
  const response = await api.get("/services", { params });
  return response.data;
};

/**
 * Retrieve service menu items from backend API
 * Endpoint: GET /services/menu
 * Response: { success, message, data: [...], meta: { total } }
 */
export const getServiceMenu = async (params = {}) => {
  const response = await api.get("/services/menu", { params });
  return response.data;
};

const serviceApi = {
  sendContactMessage,
  getServices,
  getServiceMenu,
};

export default serviceApi;