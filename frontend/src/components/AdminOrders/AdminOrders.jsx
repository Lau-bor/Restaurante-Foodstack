import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Asumiendo que tienes un contexto de autenticación
import axios from 'axios'; // Recomendado para peticiones HTTP

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth(); // Obtén el token de tu contexto

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setError("No hay token de autenticación.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/api/v1/userOrder', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
            } catch (err) {
                setError("Error al cargar los pedidos.");
                console.error("Error al hacer fetch de pedidos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const updateOrderStatus = async (orderId) => {
        try {
            await axios.put(
                `http://localhost:4000/api/v1/userOrder/${orderId}/status`,
                { status: "realizado" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Actualiza el estado localmente
            setOrders(orders =>
                orders.map(order =>
                    order._id === orderId ? { ...order, status: "realizado" } : order
                )
            );
        } catch (err) {
            setError("No se pudo actualizar el estado del pedido.");
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Cargando pedidos...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mx-auto mt-5" style={{ maxWidth: '600px' }}>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Pedidos de Clientes</h1>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID del Pedido</th>
                            <th>Usuario</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user?.email || 'N/A'}</td>
                                <td>${order.total}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.menu._id}>
                                                {item.menu?.title || 'Producto desconocido'} (x{item.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                    {order.status === "pending" && (
                                        <button
                                            className="btn btn-success btn-sm mt-2"
                                            onClick={() => updateOrderStatus(order._id)}
                                        >
                                            Marcar como realizado
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrdersPage;