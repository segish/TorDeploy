import axios from "axios";
axios.defaults.withCredentials = true;

export const makeRequest = axios.create({
    baseURL: "http://admin.94.130.104.15/api/",
    withCredentials: true,
})
