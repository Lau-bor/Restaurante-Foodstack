import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPayment } from '../../services/PaymentService';
import * as MenuService from '../../services/MenuService';

// Un hook simple para manejar el estado del carrito
const useCart = () => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (itemToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === itemToAdd._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === itemToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...itemToAdd, quantity: 1, unit_price: itemToAdd.price }];
            }
        });
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.unit_price * item.quantity, 0);
    };

    return { cartItems, addItemToCart, removeItemFromCart, getCartTotal };
};

const Orders = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const { user, loading: authLoading } = useAuth();
    const { cartItems, addItemToCart, getCartTotal, removeItemFromCart } = useCart();

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const responseData = await MenuService.getMenus();

                if (Array.isArray(responseData.data)) {
                    setMenus(responseData.data);
                } else {
                    throw new Error("Formato de datos inválido del servidor.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            if (cartItems.length === 0) {
                throw new Error("El carrito está vacío.");
            }
            if (!user) {
                throw new Error("Debes iniciar sesión para completar la compra.");
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No se encontró el token de autenticación.");
            }

            const paymentResponse = await createPayment(cartItems, token);
            window.location.href = paymentResponse.init_point;

        } catch (error) {
            console.error("Error en el pago:", error.message);
            alert(`Error en el pago: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading || authLoading) {
        return <div className="text-center mt-8">Cargando...</div>;
    }
    if (error) {
        return <div className="text-center mt-8 text-danger">Error: {error}</div>;
    }

    return (
        <div className="container py-4">
            {/* Contenedor del carrito centrado arriba en el medio */}
            <div className="d-flex justify-content-center mb-5">
                <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="card-body">
                        <h2 className="card-title text-center">Tu Carrito</h2>
                        {cartItems.length === 0 ? (
                            <p className="text-center">El carrito está vacío.</p>
                        ) : (
                            <div>
                                <ul className="list-group list-group-flush">
                                    {cartItems.map(item => (
                                        <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>{item.title} ({item.quantity})</span>
                                            <div className="d-flex align-items-center">
                                                <span className="fw-bold me-2">${item.unit_price * item.quantity}</span>
                                                <button
                                                    onClick={() => removeItemFromCart(item._id)}
                                                    className="btn btn-sm btn-link text-danger"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 fw-bold text-end">
                                    Total: ${getCartTotal()}
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isProcessing}
                                    className="btn btn-warning fw-bold w-100 mt-3"
                                >
                                    {isProcessing ? "Procesando Pago..." : "Ir a Pagar"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Fin del contenedor del carrito */}
            
            <h1 className="text-center fw-bold mb-4">Nuestro Menú</h1>
            <div className="row g-4">
                {menus.map((item) => (
                    <div key={item._id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title">{item.title}</h2>
                                <p className="card-text text-muted">{item.description}</p>
                                <p className="card-text fs-4 fw-bolder text-success">${item.price}</p>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => addItemToCart(item)}
                                        className="btn btn-primary w-100"
                                    >
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;