// src/services/PaymentService.js

const API_URL = "http://localhost:4000/api/v1";

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