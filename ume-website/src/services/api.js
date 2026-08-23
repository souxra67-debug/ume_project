import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const API_BASE = API_URL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// ✅ កែប្រែ Interceptor កុំឱ្យផ្ញើ Header បើ token គ្មានតម្លៃ ឬមិនត្រឹមត្រូវ
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export function getFullImageUrl(imagePath) {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${API_BASE}${imagePath}`;
}

export async function loginUser(username, password) {
  const response = await api.post("/auth/login/", { username, password });
  const data = response.data;
  if (data.success && data.token) {
    localStorage.setItem("access_token", data.token.access);
    localStorage.setItem("refresh_token", data.token.refresh);
  }
  return data;
}

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await api.post("/auth/logout/", { refresh: refreshToken });
    return response.data;
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return { authenticated: false, user: null };

    const response = await api.get("/auth/me/");
    return {
      authenticated: response.data.success === true,
      user: response.data.user || null,
    };
  } catch (error) {
    return { authenticated: false, user: null };
  }
}

export async function getBanners(params = {}) {
  const response = await api.get("/banners/", { params });
  return response.data;
}

export async function getNews(params = {}) {
  const response = await api.get("/news/", { params });
  return response.data;
}

export async function getNewsBySlug(slug) {
  const response = await api.get(`/news/${slug}/`);
  return response.data;
}

export async function getNewsCategories() {
  const response = await api.get("/news-categories/");
  return response.data;
}

export async function getFeaturedNews() {
  const response = await api.get("/news/featured/");
  return response.data;
}

export async function getEvents(params = {}) {
  const response = await api.get("/events/", { params });
  return response.data;
}

export async function getUpcomingEvents() {
  const response = await api.get("/events/upcoming/");
  return response.data;
}

export async function getEventBySlug(slug) {
  const response = await api.get(`/events/${slug}/`);
  return response.data;
}

export async function getGallery(params = {}) {
  const response = await api.get("/gallery/", { params });
  return response.data;
}

export async function getGalleryImage(id) {
  const response = await api.get(`/gallery/${id}/`);
  return response.data;
}

export async function trackVisitor(page = "/") {
  try {
    const response = await api.post("/visitors/track/", { page });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getVisitorSummary() {
  const response = await api.get("/stats/summary/");
  return response.data;
}

export default api;