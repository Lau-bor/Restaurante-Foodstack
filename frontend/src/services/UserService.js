import { getToken } from "./AuthServices";

const API_URL = "http://localhost:4000/api/v1/admin/users";

export const getUsers = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  const data = await res.json();
  return data.data || data;
};

export const toggleUser = async (id, isActive) => {
  const res = await fetch(`${API_URL}/${id}/inactivate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ isActive }),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Error al cambiar estado de usuario");
  return await res.json();
};


