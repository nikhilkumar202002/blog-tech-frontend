import api from "./axios";

export const getCareers = async (params = {}) => {
  const response = await api.get("/careers", { params });
  return response.data;
};

export const getCareerBySlug = async (slug) => {
  if (!slug) {
    throw new Error("Career slug is required");
  }
  const response = await api.get(`/careers/${encodeURIComponent(slug)}`);
  return response.data;
};

export const submitCareerApplication = async (data) => {
  let payload = data;

  if (!(data instanceof FormData)) {
    payload = new FormData();
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        payload.append(key, value);
      }
    });
  }

  const response = await api.post("/careers", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const careerApi = {
  getCareers,
  getCareerBySlug,
  submitCareerApplication,
};

export default careerApi