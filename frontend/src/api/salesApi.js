import axiosClient from "./axiosClient";

const RESOURCE = '/sales'

export const salesApi = {
    getAll: () => axiosClient.get(RESOURCE),
    getById: (id) => axiosClient.get(`${RESOURCE}/${id}`) ,
    create: (payload) => axiosClient.post(RESOURCE, payload) ,

}


