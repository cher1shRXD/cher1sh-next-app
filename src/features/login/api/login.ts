import { LoginData } from "../types/login-data";
import axios from "axios";

export const login = async (loginData: LoginData) => {
  const res = await axios.post('/api/auth/login', loginData);
  return res;
}