import api from "./axios";

/**
 * Retrieve published blogs from backend API
 * Endpoint: GET /blogs
 * Response: { success, message, data: [...], meta: { current_page, last_page, per_page, total } }
 */
export const getBlogs = async (params = {}) => {
  const response = await api.get("/blogs", { params });
  return response.data;
};

/**
 * Retrieve a single published blog by its slug
 * Endpoint: GET /blogs/:slug
 */
export const getBlogBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Blog slug is required");
  }
  const response = await api.get(`/blogs/${encodeURIComponent(slug)}`);
  return response.data;
};

const blogApi = {
  getBlogs,
  getBlogBySlug,
};

export default blogApi;
