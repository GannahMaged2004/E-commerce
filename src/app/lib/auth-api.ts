import { api } from "./api";

export function registerReq(body: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) {
  return api<{ token: string; user?: any }>(`/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginReq(body: { email: string; password: string }) {
  return api<{ token: string; user?: any }>(`/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function forgotPasswordReq(email: string) {
  return api<{ message: string }>(`/api/v1/auth/forgotPasswords`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function verifyResetCodeReq(resetCode: string) {
  return api<{ status: string }>(`/api/v1/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify({ resetCode }),
  });
}

export function changePasswordReq(email: string, newPassword: string) {
  return api<{ token?: string; user?: any }>(`/api/v1/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify({ email, newPassword }),
  });
}