import { apiRequest } from "../../../api/axiosClient";
import { ENDPOINTS } from "../../../api/endpoints";

export async function loginApi(payload: { email: string; password: string }) {
  return apiRequest(ENDPOINTS.auth.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerApi(payload: { username: string; email: string; password: string }) {
  return apiRequest(ENDPOINTS.auth.register, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
