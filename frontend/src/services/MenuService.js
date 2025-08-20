const API_URL = "https://restaurante-foodstack.onrender.com/api/v1/menus";

const getToken = () => localStorage.getItem("token");

export const getMenus = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Error obteniendo menús");
  return await res.json();
};

export const createMenu = async (formData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });
  if (!res.ok) throw new Error("Error creando menú");
  return await res.json();
};

export const updateMenu = async (id, formData, filesToDelete = [], replaceImages = false) => {
  
  if (filesToDelete.length > 0) {
    filesToDelete.forEach(id => formData.append("filesToDelete", id));
  }
  formData.append("replaceImages", replaceImages ? "true" : "false");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  });
  if (!res.ok) throw new Error("Error actualizando menú");
  return await res.json();
};

export const deleteMenu = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  if (!res.ok) throw new Error("Error eliminando menú");
  return await res.json();
};
