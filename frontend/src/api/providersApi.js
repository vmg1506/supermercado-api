
import axiosClient from "./axiosClient.js";

const RESOURCE = 'providers'

export const providersApi = {
    getAll: () => axiosClient.get(RESOURCE),
    getById: (id) => axiosClient.get(`${RESOURCE}/${id}`) ,
    create: (payload) => axiosClient.post(RESOURCE, payload),
    update: (id, payload) => axiosClient.put(`${RESOURCE}/${id}`, payload),
    remove: (id) => axiosClient.delete(`${RESOURCE}/${id}`),
}