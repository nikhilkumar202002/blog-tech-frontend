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

export default {
  sendContactMessage,
};