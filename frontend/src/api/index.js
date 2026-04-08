import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCarreras = () => api.get("/carreras");
export const createCarrera = (payload) => api.post("/carreras", payload);

export const fetchEstudiantes = () => api.get("/estudiantes");
export const fetchEstudianteById = (id) => api.get(`/estudiantes/${id}`);
export const createEstudiante = (payload) => api.post("/estudiantes", payload);
export const updateEstudiante = (id, payload) =>
  api.put(`/estudiantes/${id}`, payload);
export const deleteEstudiante = (id) => api.delete(`/estudiantes/${id}`);

export default api;
