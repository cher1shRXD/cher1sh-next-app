import axios from "axios";
import { API_URL } from "@/constants/api";
import { requestHandler } from "./requestHandler";
import { responseErrorHandler } from "./responseErrorHandler";

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(requestHandler, async (error) => {
  console.log(error);
  await Promise.reject(error);
});

customAxios.interceptors.response.use(
  (response) => response,
  responseErrorHandler
); 

export default customAxios;
