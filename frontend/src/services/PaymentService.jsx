
const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`;

export const createPayment = async (cartItems, token) => {
    const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ items: cartItems }),
    });

    if (!res.ok) {
        throw new Error('Error al crear la preferencia de pago');
    }

    const data = await res.json();
    return data; 
};