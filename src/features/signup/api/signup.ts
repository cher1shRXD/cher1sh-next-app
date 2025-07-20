import { SignupData } from "../types/signup-data";
import axios from "axios";

export const signup = async (signupData: SignupData) => {
  const res = await axios.post('/api/auth/signup', signupData);
  return res;
}