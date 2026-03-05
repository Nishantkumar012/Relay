import apiClient from "../../services/apiClient";

import type { LoginPayload, AuthResponse } from "./types";

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", payload);
  console.log(apiClient);
  // console.log("m yha");

  return response.data;
};
