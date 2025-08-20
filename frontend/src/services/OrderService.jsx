const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const getOrders = async (token) => {
    const res = await fetch(`${API_URL}/userorder`, {
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