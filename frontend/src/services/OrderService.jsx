const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const createUserOrder = async (orderData, token) => {
  try {
    const response = await fetch(`${API_URL}/userOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "No se pudo crear la orden.");
    }

    return data;
  } catch (error) {
    console.error("Error creating user order:", error);
    throw error;
  }
};

export const getOrders = async (token) => {
    const res = await fetch(`${API_URL}/userOrder`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        throw new Error('No se pudo obtener las órdenes');
    }

    const data = await res.json();
    return data;
};

export const updateOrderStatus = async (id, status, token) => {
  const res = await fetch(`${API_URL}/userOrder/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el estado de la orden");
  }

  return res.json();
};
