import { api } from "./api";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

export async function getMe() {
  const res = await api<any>(`/api/v1/users/getMe`, { auth: true });
  if (res?.data?.user) return res.data.user as User;
  if (res?.data) return res.data as User;
  return res as User;
}
export async function updateMe(body: Partial<Pick<User, "name" | "email" | "phone">>) {
  return api<any>(`/api/v1/users/updateMe`, {
    method: "PUT",
    body: JSON.stringify(body),
    auth: true,
  });
}

export async function changeMyPassword(body: {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}) {
  return api<any>(`/api/v1/users/changeMyPassword`, {
    method: "PUT",
    body: JSON.stringify(body),
    auth: true,
  });
}