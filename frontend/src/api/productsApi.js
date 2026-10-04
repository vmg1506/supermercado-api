import axiosClient from "./axiosClient.js";

const RESOURCE = '/products'

export const productsApi = {
    getAll: () => axiosClient.get(RESOURCE),
    getById: (id) => axiosClient.get(`${RESOURCE}/${id}`),
    create: (payload) => axiosClient.post(RESOURCE, payload),
    update: (id, payload) => axiosClient.put(`${RESOURCE}/${id}`, payload),
    delete: (id) => axiosClient.delete(`${RESOURCE}/${id}`)
}