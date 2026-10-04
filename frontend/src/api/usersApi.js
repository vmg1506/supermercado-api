import axiosClient from "./axiosClient";

const RESOURCE = '/users'


export const usersApi = {
    getAll: () => axiosClient.get(RESOURCE),
    getById: (id) => axiosClient.get(`${RESOURCE}/${id}`),
    create: (payload) => axiosClient.post(RESOURCE, payload),
    update: (id, payload) => axiosClient.put(`${RESOURCE}/${id}`, payload),
    delete: (id) => axiosClient.delete(`${RESOURCE}/${id}`)
}