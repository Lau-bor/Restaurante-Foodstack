const API_URL = "http://localhost:3003/api/v1";

export const getOrders = async (token) => {
    const res = await fetch(`${API_URL}/userorder`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ Envía el token de forma segura
        },
    });

    if (!res.ok) {
        throw new Error('No se pudo obtener las órdenes');
    }

    const data = await res.json();
    return data;
};