import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const { token } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            
            if (!token) {
                setLoading(false);
                setError('No estás autenticado para ver los pedidos.');
                return;
            }

            try {
                
                const response = await fetch('http://localhost:4000/api/userOrder', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos.');
                }

                const data = await response.json();
                setOrders(data);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]); 

    
    if (loading) return <div className="text-center my-5"><p>Cargando pedidos...</p></div>;
    if (error) return <div className="alert alert-danger mx-auto my-5" style={{maxWidth: '600px'}} role="alert">Error: {error}</div>;
    if (orders.length === 0) return <div className="text-center my-5"><p>No tienes pedidos en tu historial.</p></div>;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Mis Pedidos Anteriores</h1>
            <div className="row g-4 justify-content-center">
                {orders.map(order => (
                    <div key={order._id} className="col-12">
                        <div className="card shadow">
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                <h5>Pedido ID: {order._id.substring(0, 8)}...</h5>
                                <span className={`badge rounded-pill ${order.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>{item.menu.title} ({item.quantity}x)</span>
                                            <span className="fw-bold">${item.menu.price * item.quantity}</span>
                                        </li>
                                    ))}
                                    <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                        <span>Total del Pedido:</span>
                                        <span className="fs-5">${order.total}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer text-muted">
                                Realizado el: {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



export default Orders;
