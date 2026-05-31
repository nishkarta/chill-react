import type { LoginFormProps, RegisterFormProps } from "@features/login/login.types";
import { API_BASE_URL } from "@shared/utils/config";
import axios from "axios";


export const login = async (data: LoginFormProps) => {

  const response = await axios.post(`${API_BASE_URL}/auth/login`, data)
  return response.data
}
export const register = async (data: RegisterFormProps) => {

  const response = await axios.post(`${API_BASE_URL}/auth/register`, data)
  return response.data
}