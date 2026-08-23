import api, {
  getFullImageUrl,
} from "./api";

export const bannerApi = {
  getAll: async (params = {}) => {
    const response = await api.get("/banners/", {
      params: {
        show_all: true,
        ...params,
      },
    });

    return response.data;
  },

  getOne: async (id) => {
    const response = await api.get(`/banners/${id}/`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post("/banners/", formData);
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.patch(`/banners/${id}/`, formData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/banners/${id}/`);
    return response.data;
  },
};

export const newsApi = {
  getAll: async (params = {}) => {
    const response = await api.get("/news/", {
      params: {
        show_all: true,
        ...params,
      },
    });
    return response.data;
  },

  getOne: async (slug) => {
    const response = await api.get(`/news/${slug}/`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post("/news/", formData);
    return response.data;
  },

  update: async (slug, formData) => {
    const response = await api.patch(`/news/${slug}/`, formData);
    return response.data;
  },

  delete: async (slug) => {
    const response = await api.delete(`/news/${slug}/`);
    return response.data;
  },
};

export const categoryApi = {
  getAll: async (params = {}) => {
    const response = await api.get("/news-categories/", { params });
    return response.data;
  },

  getOne: async (slug) => {
    const response = await api.get(`/news-categories/${slug}/`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/news-categories/", data);
    return response.data;
  },

  update: async (slug, data) => {
    const response = await api.patch(`/news-categories/${slug}/`, data);
    return response.data;
  },

  delete: async (slug) => {
    const response = await api.delete(`/news-categories/${slug}/`);
    return response.data;
  },
};

export { getFullImageUrl };