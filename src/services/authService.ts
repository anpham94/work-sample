import apiService from "@/services/apiService";
import { type User } from "@/stores/authStore";

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export type LoginCredentials = Record<string, string>;

const authService = {
  login: (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiService.post<LoginResponse>("/login", credentials);
  },
};

export default authService;
